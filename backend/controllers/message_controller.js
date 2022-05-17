const prisma = require("../config/prisma");
const cloudinary = require("cloudinary");

exports.sendMessage = async (req, res) => {
  const { text, attachments, receiverId, senderId, conversationId } = req.body;

  try {
    // Upload files to cloudinary
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
          conversationId: +conversationId,
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

exports.addReact = async (req, res) => {
  const { msgId, react, userId } = req.body;

  try {
    const hasReact = await prisma.reaction.findMany({
      where: {
        message: {
          id: +msgId,
        },
        user: {
          id: +userId,
        },
      },
    });

    console.log(hasReact);
    if (hasReact.length > 0) {
      await prisma.reaction.updateMany({
        where: {
          message: {
            id: +msgId,
          },
          user: {
            id: +userId,
          },
        },
        data: {
          id: react.id,
          name: react.name,
          native: react.native,
          colons: react.colons,
          emoticons: react.emoticons,
          short_names: react.short_names,
          skin: react.skin === null ? "" : react.skin.toString(),
          unified: react.unified,
        },
      });
    } else {
      await prisma.reaction.create({
        data: {
          id: react.id,
          name: react.name,
          native: react.native,
          colons: react.colons,
          emoticons: react.emoticons,
          short_names: react.short_names,
          skin: react.skin === null ? "" : react.skin.toString(),
          unified: react.unified,
          message: {
            connect: {
              id: +msgId,
            },
          },
          user: {
            connect: {
              id: +userId,
            },
          },
        },
      });
    }

    return res.json({
      success: true,
      message: "Added reaction",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Something went wrong",
    });
  }
};
