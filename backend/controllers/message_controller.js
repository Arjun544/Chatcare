const prisma = require("../config/prisma");
const cloudinary = require("cloudinary");

exports.sendMessage = async (req, res) => {
  const { text, attachments, receiverId, senderId, conversationId } = req.body;

  try {
    // Upload files to cloudinary
    let uploadedFiles = [];
    if (attachments.length > 0) {
      const uploader = async (path) => await cloudinary.uploader.upload(path);

      for (const file of attachments) {
        const newPath = await uploader(file.url);
        uploadedFiles.push({
          attachmentId: newPath.public_id,
          name: file.name,
          url: newPath.secure_url,
          type: newPath.format,
        });
      }
    }

    await prisma.message.create({
      data: {
        text,
        attachments: {
          create: uploadedFiles.length > 0 ? uploadedFiles : [],
        },
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
