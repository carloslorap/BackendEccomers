const express = require('express')
const { createEnquiry, deleteEnquiry, getEnquiry, getAllEnquiry, updateEnquiry } = require('../controller/enqCtrl')
const {isAdmin,authMiddleware}=require('../middlewares/authMiddleware')
const router = express.Router()

router.post('/',createEnquiry)
router.put('/:id',updateEnquiry)
router.delete('/:id',authMiddleware,isAdmin,deleteEnquiry)
router.get('/:id',getEnquiry)
router.get('/',getAllEnquiry)


module.exports = router 
