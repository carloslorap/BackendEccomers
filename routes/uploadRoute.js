const express = require("express");
const { uploadImages, deleteImages } = require("../controller/uploadCtrl");
const {isAdmin,authMiddleware}=require('../middlewares/authMiddleware')
const {
  uploadPhoto,
  productImageResize,
} = require("../middlewares/uploadImage");
const router = express.Router();

router.post(
  "/",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images"),
  productImageResize,
  uploadImages
); 

router.delete("/delete-img/:id", authMiddleware, isAdmin, deleteImages);

module.exports = router;
