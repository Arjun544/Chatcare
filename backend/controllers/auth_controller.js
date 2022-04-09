const prisma = require("../config/prisma");
const moment = require("moment");
const { sendEmail } = require("../helpers/mailer");
const {
  storeRefreshToken,
  hashPassword,
  generateTokens,
  comparePassword,
  verifyRefreshToken,
  findRefreshToken,
  updateRefreshToken,
  removeToken,
} = require("../helpers/helpers");

exports.register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    if (!username || !email || !password || !confirmPassword) {
      return res.json({
        success: false,
        status: 400,
        message: "All fields are required",
      });
    }

    //   Check if password is less than 8 characters
    if (password.length < 8) {
      return res.json({
        success: false,
        status: 400,
        message: "Passwords must be at least 8 characters long",
      });
    }

    //   Check if password and confirmPassword match
    if (password !== confirmPassword) {
      return res.json({
        success: false,
        status: 400,
        message: "Passwords do not match",
      });
    }

    // Check if email already exists
    const hasUser = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        email: true,
      },
    });
    if (hasUser) {
      return res.json({
        success: false,
        message: "Email already exists",
      });
    }

    // Hash password
    const hashedPass = await hashPassword(password);

    let code = Math.floor(100000 + Math.random() * 900000); //Generate random 6 digit code.
    let expiry = Date.now() + 60 * 1000 * 10; //Set expiry 10 mins ahead from now

    const sendCode = await sendEmail(email, code);

    if (sendCode.error) {
      return res.status(500).json({
        error: true,
        message: "Couldn't send verification email.",
      });
    }

    //  Create new user
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPass,
        emailToken: code,
        emailTokenExpires: new Date(expiry),
        resetPasswordToken: 1,
        resetPasswordExpires: new Date(),
        profile: "",
        profileId: "",
        location: "",
      },
    });
    // Generate token
    const { accessToken, refreshToken } = generateTokens({
      id: newUser.id,
      isActivited: false,
    });
    // Store refresh token
    await storeRefreshToken(refreshToken, newUser.id);
    // Set cookie
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    return res.json({
      success: true,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        active: newUser.active,
        profile: newUser.profile,
        location: newUser.location,
      },
      isAuth: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: "Cannot Register",
    });
  }
};

exports.activate = async (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) {
      return res.json({
        success: false,
        status: 400,
        message: "All fields are required",
      });
    }
    const user = await prisma.user.findMany({
      where: {
        email,
        emailToken: +code,
        emailTokenExpires: {
          gt: new Date(),
        },
      },
    });
    if (user.length === 0) {
      return res.json({
        success: false,
        message: "Invalid details",
      });
    } else {
      if (user.active)
        return res.json({
          success: false,
          message: "Account already activated",
          status: 400,
        });

      const newUser = await prisma.user.update({
        where: {
          email,
        },
        data: {
          emailToken: undefined,
          emailTokenExpires: undefined,
          active: true,
        },
      });

      return res.json({
        success: true,
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          active: newUser.active,
          profile: newUser.profile,
          location: newUser.location,
        },
        isAuth: true,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: true,
        message: "All fields are required.",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
        active: true,
        profile: true,
        location: true,
        tokens: true,
      },
    });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }
    // Compare password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Incorrect credentials",
      });
    }

    // Generate token
    const { accessToken, refreshToken } = generateTokens({
      id: user.id,
      isActivited: false,
    });
    // Store refresh token
    await storeRefreshToken(refreshToken, user.id);
    // Set cookie
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    return res.json({
      success: true,
      tokens: user.tokens,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        profile: user.profile,
        active: user.active,
        location: user.location,
      },
      isAuth: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.json({
        status: 400,
        error: true,
        message: "All fields are required",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return res.json({
        success: true,
        message: "User not found",
      });
    }

    let code = Math.floor(100000 + Math.random() * 900000);
    let response = await sendEmail(user.email, code, (isForgetPassword = true));

    if (response.error) {
      return res.status(500).json({
        error: true,
        message: "Couldn't send mail. Please try again later.",
      });
    }

    let expiry = Date.now() + 60 * 1000 * 10;

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        resetPasswordToken: code,
        resetPasswordExpires: expiry,
      },
    });

    return res.json({
      success: true,
      message:
        "If your email address is in our database, we will send you an email to reset your password",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

exports.sendCode = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.json({
        status: 400,
        success: false,
        message: "All fields are required",
      });
    }
    let code = Math.floor(100000 + Math.random() * 900000); //Generate random 6 digit code.
    let expiry = Date.now() + 60 * 1000 * 10; //Set expiry 10 mins ahead from now

    const sendCode = await sendEmail(email, code);

    if (sendCode.error) {
      return res.status(500).json({
        success: false,
        message: "Couldn't send verification email.",
      });
    }
    const user = await prisma.user.update({
      where: {
        email,
      },
      data: {
        emailToken: code,
        emailTokenExpires: new Date(expiry),
      },
    });
    return res.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        active: user.active,
        profile: user.profile,
        location: user.location,
      },
      isAuth: true,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword, confirmPassword } = req.body;
    if (!email || !code || !newPassword || !confirmPassword) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }
    const user = await prisma.user.findMany({
      where: {
        email,
        resetPasswordToken: +code,
        resetPasswordExpires: {
          gt: new Date(),
        },
      },
    });

    if (user.length === 0) {
      return res.json({
        error: true,
        message: "Password reset token is invalid or has expired.",
      });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        error: true,
        message: "Passwords didn't match",
      });
    }
    const hash = await hashPassword(newPassword);

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        resetPasswordToken: undefined,
        resetPasswordExpires: undefined,
        password: hash,
      },
    });

    return res.json({
      success: true,
      message: "Password has been changed",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

exports.refresh = async (req, res) => {
  // get refresh token from cookie
  const { refreshToken: refreshTokenFromCookie } = req.cookies;
  // check if token is valid
  let userData;
  try {
    userData = await verifyRefreshToken(refreshTokenFromCookie);
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
  // Check if token is in db
  try {
    const token = await findRefreshToken(userData.id, refreshTokenFromCookie);
    if (token.length === 0) {
      return res.status(401).json({ message: "Invalid token" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Can't find token" });
  }
  // check if valid user
  const user = await prisma.user.findUnique({
    where: {
      id: userData.id,
    },
  });
  if (!user) {
    return res.status(404).json({ message: "No user" });
  }
  // Generate new tokens
  const { refreshToken, accessToken } = generateTokens({
    id: userData.id,
    isActivited: false,
  });

  // Update refresh token
  try {
    await updateRefreshToken(userData.id, refreshToken, refreshTokenFromCookie);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Can't update refresh token" });
  }
  // put in cookie
  res.cookie("refreshToken", refreshToken, {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true,
  });

  res.cookie("accessToken", accessToken, {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true,
  });
  res.json({
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      active: user.active,
      profile: user.profile,
      location: user.location,
    },
    isAuth: true,
  });
};

exports.logout = async (req, res) => {
  const { refreshToken } = req.cookies;
  // delete refresh token from db
  await removeToken(refreshToken);
  // delete cookies
  res.clearCookie("refreshToken");
  res.clearCookie("accessToken");
  res.json({ user: null, isAuth: false });
};

exports.gmailLogin = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if email already exists
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        username: true,
        email: true,
        active: true,
        profile: true,
        location: true,
      },
    });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found, please signup",
      });
    }

    // Generate token
    const { accessToken, refreshToken } = generateTokens({
      id: newUser.id,
      isActivited: false,
    });
    // Store refresh token
    await storeRefreshToken(refreshToken, newUser.id);
    // Set cookie
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    return res.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        active: user.active,
        profile: user.profile,
        location: user.location,
      },
      isAuth: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

exports.gmailSignup = async (req, res) => {
  const { username, email, profile } = req.body;

  try {
    // Check if email already exists
    const hasUser = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        email: true,
      },
    });

    if (hasUser) {
      return res.json({
        success: false,
        message: "Email already exists, please login",
      });
    }

    // Register user
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: "",
        emailToken: 1,
        emailTokenExpires: new Date(),
        resetPasswordToken: 1,
        resetPasswordExpires: new Date(),
        profile: profile,
        profileId: "",
        location: "",
      },
    });

    // Generate token
    const { accessToken, refreshToken } = generateTokens({
      id: user.id,
      isActivited: false,
    });
    // Store refresh token
    await storeRefreshToken(refreshToken, user.id);
    // Set cookie
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    return res.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        active: user.active,
        profile: user.profile,
        location: user.location,
      },
      isAuth: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Server Error");
  }
};
