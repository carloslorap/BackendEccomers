const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const Coupon = require("../models/couponModel");


const createCoupon = asyncHandler(async(req,res)=>{

    try {
        const newCoupon = await Coupon.create(req.body);
        res.json(newCoupon);
    } catch (error) {
            throw new Error(error)
    }
})

const getAllCoupon = asyncHandler(async(req,res)=>{

    try {
        const Coupons = await Coupon.find();
        res.json(Coupons);
    } catch (error) {
            throw new Error(error)
    }
})

const updateCoupon = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateMongoDbId(id)
    try {
        const upCoupons = await Coupon.findByIdAndUpdate(id,req.body,{
            new:true,
        });
        res.json(upCoupons);
    } catch (error) {
            throw new Error(error)
    }
})

const deleteCoupon = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateMongoDbId(id)
    try {
        const deleteCoupons = await Coupon.findByIdAndDelete(id);
        res.json(deleteCoupons);
    } catch (error) {
            throw new Error(error)
    }
})

const getCoupon = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateMongoDbId(id)
    try {
        const getcoupon = await Coupon.findById(id);
        res.json(getcoupon);
    } catch (error) {
            throw new Error(error)
    }
})

module.exports = {
    createCoupon,getAllCoupon,updateCoupon,deleteCoupon,getCoupon,
  };






