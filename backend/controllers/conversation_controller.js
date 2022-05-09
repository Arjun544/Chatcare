const prisma = require("../config/prisma");
const cloudinary = require("cloudinary");

exports.createConversation = async (req, res) => {
  const { byId, toId, message, attachments } = req.body;
  try {
    let uploadedFiles = [];
    if (attachments.length > 0) {
      const uploader = async (path) =>
        await cloudinary.v2.uploader.upload_large(path, {
          resource_type: "auto",
        });

      for (const file of attachments) {
        const newPath = await uploader(file.url);
        uploadedFiles.push({
          attachmentId: newPath.public_id,
          name: file.name,
          url: newPath.secure_url,
          type: file.type.includes("image")
            ? "png"
            : file.type.includes("pdf")
            ? "pdf"
            : file.type.includes("audio")
            ? "mp3"
            : "video",
        });
      }
    }

    await prisma.conversation.create({
      data: {
        members: {
          connect: [{ id: +byId }, { id: +toId }],
        },
        messages: {
          create: {
            text: message,
            attachments: {
              create: uploadedFiles.length > 0 ? uploadedFiles : [],
            },
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
        members: {
          some: {
            id: +userId,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        members: true,
        messages: true,
        messages: {
          take: -1, // take last message
        },
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

exports.getConversationMsgs = async (req, res) => {
  const { conversationId } = req.params;
  try {
    const messages = await prisma.message.findMany({
      where: {
        conversationId: +conversationId,
      },
      take: -15, // take last 15 messages
      include: {
        attachments: true,
      },
    });
    return res.json({
      success: true,
      messages,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Something went wrong",
    });
  }
};

exports.getConversationImages = async (req, res) => {
  const { conversationId } = req.params;
  try {
    const images = await prisma.message.findMany({
      where: {
        conversationId: +conversationId,
      },
    });
    console.log(images);
    return res.json({
      success: true,
      images,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Something went wrong",
    });
  }
};
