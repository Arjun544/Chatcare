const prisma = require("../config/prisma");

exports.sendMessage = async (req, res) => {
  const { text, receiverId, senderId, conversationId } = req.body;
  try {
    await prisma.message.create({
      data: {
        text,
        image: null,
        sender: {
          connect: {
            id: +senderId,
          },
        },
        receiver: {
          connect: {
            id: +receiverId,
          },
        },
        conversation: {
          connect: {
            id: +conversationId,
          },
        },
      },
    });
    return res.json({
      success: true,
      message: "Sent message",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Something went wrong",
    });
  }
};
