const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require('fs') 

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpeg");
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(
      {
        message: "Unsupported file format",
      },
      false
    );
  }
};

const uploadPhoto = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 1000000 },  // Cambiado de fieldSize a fileSize
});
const productImageResize = async (req, res, next) => {
  if (!req.files) return next();
  try {
    await Promise.all(
      req.files.map(async (file) => {
        await sharp(file.path)
          .resize(300, 300)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`public/images/products/${file.filename}`);
        // Manejo de errores al eliminar el archivo original
        try {
          fs.unlinkSync(file.path);
        } catch (error) {
          console.error(`Error al eliminar el archivo original: ${error.message}`);
        }
      })
    );
    next();
  } catch (error) {
    console.error(`Error en productImageResize: ${error.message}`);
    next(error);
  }
};
  
const blogImageResize = async (req, res, next) => {
    if (!req.files) return next(); 
    await Promise.all(
      req.files.map(async (file) => {
        await sharp(file.path)
          .resize(300, 300)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`public/images/blogs/${file.filename}`); 
          fs.unlinkSync(`public/images/blogs/${file.filename}`)
      })

    );
    next()
  };

module.exports = { uploadPhoto,productImageResize ,blogImageResize};
