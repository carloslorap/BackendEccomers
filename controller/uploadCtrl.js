const asyncHandler = require("express-async-handler");
const {
  cloudinaryUploadImg,
  cloudinaryDeleteImg,
} = require("../utils/cloudinary");
const fs = require("fs");

const uploadImages = asyncHandler(async (req, res) => {
  //(tambien comentamos esto por que solo se debia de este codigo solo para encontrar el id)
  // const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const uploader = (path) => cloudinaryUploadImg(path, "images");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      urls.push(newpath);
      fs.unlinkSync(path);
    }

    const images = urls.map(
      (file) => {
        return file;
      },
      { new: true }
    );
    //(esto ya no sirver anterior servia para subir la imagen mediante el id pero en realidad no debe ser asi)
    // const findProduct = await Product.findByIdAndUpdate(id, {
    //   images: urls.map(
    //     (file) => {
    //       return file;
    //     },
    //     { new: true }
    //   ),
    // });
    res.json(images);
  } catch (error) {
    throw new Error(error);
  }
});

//(cuando intetes eliminar una imagen en la api agarra el "public_id" para poder eliminar la imagen de tu "cloudinary")
const deleteImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = cloudinaryDeleteImg(id, "images");

    res.json({ message: "deleted" });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  uploadImages,
  deleteImages,
};
