const multer = require("multer");
const cloudinary = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "Chatcare",
    public_id: "Chatcare",
    resource_type: "raw",
  },
  transformation: [
    {
      width: 200,
      height: 200,
      crop: "limit",
    },
  ],
});

module.exports = multer({ storage: storage });
