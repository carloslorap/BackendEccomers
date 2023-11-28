const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure:true
});

const cloudinaryUploadImg = async (fileToUploads) => {
try {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(fileToUploads, (result) => {
      resolve(
        {
          url: result.secure_url,
          asset_id: result.asset_id,
          public_id: result.public_id,
        },
        {
          resource_type: "auto",
        }
      );
    });
  });
} catch (error) {
  console.error('Error in cloudinaryUploadImg:', error);
  throw error;
}
};

const cloudinaryDeleteImg = async (fileToDelete) => { 
try {
  return new Promise((resolve) => {
    cloudinary.uploader.destroy(fileToDelete, (result) => {
      resolve(
        {
          url: result.secure_url,
          asset_id: result.asset_id,
          public_id: result.public_id,
        },
        {
          resource_type: "auto",
        }
      );
    });
  });
} catch (error) {
  console.error('Error in cloudinaryDeleteImg:', error);
  throw error;
}
};

module.exports = { cloudinaryUploadImg, cloudinaryDeleteImg };
