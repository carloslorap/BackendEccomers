const BlogCategory = require ("../models/blogCatModel.js")
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createBlogCategory = asyncHandler(async(req,res) =>{
    try {
        const newCategory = await BlogCategory.create(req.body);
        res.json(newCategory);
    } catch (error) {
        throw new Error(error)
    }
})

const updateBlogCategory = asyncHandler(async(req,res) =>{
    const {id} = req.params;
    validateMongoDbId(id);
    try {
        const updatedCategory = await BlogCategory.findByIdAndUpdate(id,req.body,{
            new:true,
        });
        res.json(updatedCategory);
    } catch (error) {
        throw new Error(error)
    }
})

const deleteBlogCategory = asyncHandler(async(req,res) =>{
    const {id} = req.params;
    validateMongoDbId(id);
    try {
        const deletedCategory = await BlogCategory.findByIdAndDelete(id);
        res.json(deletedCategory);
    } catch (error) {
        throw new Error(error)
    }
})

const getBlogCategory = asyncHandler(async(req,res) =>{
    const {id} = req.params;
    validateMongoDbId(id);
    try {
        const getategory = await BlogCategory.findById(id);
        res.json(getategory);
    } catch (error) {
        throw new Error(error)
    }
})

const getAllBlogCategory = asyncHandler(async(req,res) =>{

    try {
        const getalltegory = await BlogCategory.find();
        res.json(getalltegory);
    } catch (error) {
        throw new Error(error)
    }
})
  
 

 module.exports = {createBlogCategory,updateBlogCategory,deleteBlogCategory,getBlogCategory,getAllBlogCategory}