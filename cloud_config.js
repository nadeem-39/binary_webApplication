const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

// console.log(process.env.CLOUD_API);
// console.log(process.env.CLOUD_NAME);
// console.log(process.env.API_SECRET);

cloudinary.config({
    cloud_name :process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API,
    api_secret: process.env.API_SECRET
})



const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'Binary_web',
      allowed_format:['.png,.jpeg,.jpg'] // supports promises as well
    },
  });


  module.exports = {storage,cloudinary};

