const prisma = require("../config/prisma");

exports.allUsers = async (req, res) => {
  const { email } = req.params;

  try {
    // Get all users except the current user
    const users = await prisma.user.findMany({
      where: {
        NOT: {
          email: {
            endsWith: email,
          },
        },
      },
    });
    return res.json({
      status: true,
      users,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: false,
      message: err,
    });
  }
};

exports.sendFriendRequest = async (req, res) => {
  const { userId, friendId } = req.body;
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        friends: {
          connect: {
            id: friendId,
          },
        },
      },
    });
    return res.json({
      status: true,
      message: "Sent freind request",
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: false,
      message: err,
    });
  }
};

exports.cancelFriendRequest = async (req, res) => {
  const { userId, friendId } = req.body;
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        friends: {
          disconnect: {
            id: friendId,
          },
        },
      },
    });
    return res.json({
      status: true,
      message: "Cancelled freind request",
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: false,
      message: err,
    });
  }
};
