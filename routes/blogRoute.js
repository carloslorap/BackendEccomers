const express = require('express')
const router = express.Router()
const {isAdmin,authMiddleware}=require('../middlewares/authMiddleware')
const { createBlog, updateBlog, getBlog, getAllBlog, deleteBlog, likeBlog, dislikeBlog, uploadImages } = require('../controller/blogCtrl')
const { blogImageResize, uploadPhoto } = require('../middlewares/uploadImage')

 

router.post('/', authMiddleware,isAdmin,createBlog)
router.put( 
    "/upload/:id",
    authMiddleware,
    isAdmin,
    uploadPhoto.array('images', 2),
    blogImageResize,
    uploadImages
  );
router.put('/likes', authMiddleware,likeBlog)
router.put('/dislikes', authMiddleware,dislikeBlog)
router.put('/:id', authMiddleware,isAdmin,updateBlog)
router.get('/:id',getBlog)
router.get('/',getAllBlog)
router.delete('/:id', authMiddleware,isAdmin,deleteBlog)


module.exports = router 