const prisma = require("../config/prisma");

exports.createConversation = async (req, res) => {
  const { byId, toId, message } = req.body;
  try {
    const conversations = await prisma.conversation.create({
      data: {
        by: {
          connect: {
            id: +byId,
          },
        },
        to: {
          connect: {
            id: +toId,
          },
        },
        messages: {
          create: {
            text: message,
            sender: {
              connect: {
                id: +byId,
              },
            },
            receiver: {
              connect: {
                id: +toId,
              },
            },
          },
        },
      },
    });
    console.log(conversations);
    return res.json({
      success: true,
      message: "Conversation created",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Something went wrong",
    });
  }
};

exports.getUserConversations = async (req, res) => {
  const { userId } = req.params;
  try {
    const conversations = await prisma.conversation.findMany({
      where: {
        byId: +userId,
      },
      include: {
        to: true,
        messages: true,
      },
    });
    return res.json({
      success: true,
      conversations,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Something went wrong",
    });
  }
};
