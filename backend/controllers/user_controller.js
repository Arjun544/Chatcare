const prisma = require("../config/prisma");

exports.allUsers = async (req, res) => {
  const { email, friendsIds } = req.body;
  try {
    // Get all users except the current user and who are not friends
    const users = await prisma.user.findMany({
      where: {
        NOT: {
          email: {
            endsWith: email,
          },
        },
        id: { notIn: friendsIds },
      },
      select: {
        id: true,
        email: true,
        username: true,
        profile: true,
        location: true,
        active: true,
        conversations: true,
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

exports.userFriends = async (req, res) => {
  const { email } = req.params;
  try {
    // Get user friends
    const user = await prisma.user.findMany({
      where: {
        email,
      },
      select: {
        friends: true,
      },
    });
    return res.json({
      status: true,
      friends: user[0].friends,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: false,
      message: err,
    });
  }
};

exports.userRequests = async (req, res) => {
  const { email } = req.params;
  try {
    // Get user requests
    const user = await prisma.user.findMany({
      where: {
        email,
      },
      select: {
        requests: true,
      },
    });
    return res.json({
      status: true,
      requests: user[0].requests,
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
        requests: {
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

exports.confirmFriendRequest = async (req, res) => {
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

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        requests: {
          disconnect: {
            id: friendId,
          },
        },
      },
    });

    return res.json({
      status: true,
      message: "Sent friend request",
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: false,
      message: err,
    });
  }
};

exports.removeFriend = async (req, res) => {
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
      message: "Removed friend",
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
        requests: {
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

exports.sendMsgRequest = async (req, res) => {
  const { userId } = req.body;
  try {
    await prisma.msgRequest.create({
      data: {
        msg: msg,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return res.json({
      status: true,
      message: "Sent message request",
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: false,
      message: err,
    });
  }
};
