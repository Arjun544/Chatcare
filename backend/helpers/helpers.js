const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");

exports.hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw new Error("Hashing failed", error);
  }
};

exports.comparePassword = async (password, hashedPass) => {
  try {
    return await bcrypt.compare(password, hashedPass);
  } catch (error) {
    throw new Error("Hashing failed", error);
  }
};

exports.generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: "1y",
  });
  return { accessToken, refreshToken };
};

exports.storeRefreshToken = async (token, userId) => {
  try {
    await prisma.token.create({
      data: {
        token,
        user: { connect: { id: userId } },
      },
    });
  } catch (err) {
    console.log(err.message);
  }
};

exports.verifyAccessToken = (token) =>
  jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);

exports.verifyRefreshToken = (token) =>
  jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET);

exports.findRefreshToken = async (userId, refreshToken) => {
  const token = await prisma.token.findMany({
    where: {
      token: refreshToken,
      userId: userId,
    },
  });
  return token;
};

exports.updateRefreshToken = async (
  userId,
  refreshToken,
  refreshTokenFromCookie
) => {
  return await prisma.token.update({
    where: {
      token: refreshTokenFromCookie,
    },
    data: {
      token: refreshToken,
    },
  });
};

exports.removeToken = async (id, refreshToken) => {
  return await prisma.token.deleteMany({
    where: {
      id: id,
      token: refreshToken,
    },
  });
};
