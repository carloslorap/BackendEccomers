const Category = require ("../models/prodcategoryModel")
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createCategory = asyncHandler(async(req,res) =>{
    try {
        const newCategory = await Category.create(req.body);
        res.json(newCategory);
    } catch (error) {
        throw new Error(error)
    }
})

const updateCategory = asyncHandler(async(req,res) =>{
    const {id} = req.params;
    validateMongoDbId(id);
    try {
        const updatedCategory = await Category.findByIdAndUpdate(id,req.body,{
            new:true,
        });
        res.json(updatedCategory);
    } catch (error) {
        throw new Error(error)
    }
})

const deleteCategory = asyncHandler(async(req,res) =>{
    const {id} = req.params;
    validateMongoDbId(id);
    try {
        const deletedCategory = await Category.findByIdAndDelete(id);
        res.json(deletedCategory);
    } catch (error) {
        throw new Error(error)
    }
})

const getCategory = asyncHandler(async(req,res) =>{
    const {id} = req.params;
    validateMongoDbId(id);
    try {
        const getategory = await Category.findById(id);
        res.json(getategory);
    } catch (error) {
        throw new Error(error)
    }
})

const getAllCategory = asyncHandler(async(req,res) =>{

    try {
        const getalltegory = await Category.find();
        res.json(getalltegory);
    } catch (error) {
        throw new Error(error)
    }
})
 

 module.exports = {createCategory,updateCategory,deleteCategory,getCategory,getAllCategory}










