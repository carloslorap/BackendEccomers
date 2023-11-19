const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const slugify = require("slugify");
const User = require("../models/userModel");

const validateMongoDbId = require("../utils/validateMongodbId");


const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updateproduct = await Product.findOneAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );
    res.json(updateproduct);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    const deleteproduct = await Product.findOneAndDelete({ _id: id });
    res.json(deleteproduct);
  } catch (error) {
    throw new Error(error);
  }
});

const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const findProduct = await Product.findById(id).populate("color");
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllProduct = asyncHandler(async (req, res) => {
  try {
    //esta parte es para los "FILTROS" ya sea para la longitud de "precios","categoria","color","marca"
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((e) => delete queryObj[e]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    let query = Product.find(JSON.parse(queryStr)).populate("color");

    //Clasificación
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    //limitando los campos (osea los nombre de los campos que pongamos en la api se mostrara solo esos campos)
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    //pagination
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) throw new Error("this Page does not exists");
    }

    console.log(page, limit, skip);
    const product = await query;
    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});

const addToWishList = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { prodId } = req.body;
  try {
    const user = await User.findById(_id);
    const alreadyadded = user.wishlist.find((id) => id.toString() === prodId);
    if (alreadyadded) {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { wishlist: prodId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $push: { wishlist: prodId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const rating = asyncHandler(async (req, res) => {
  const { _id, firstname, lastname } = req.user;
  const { start, prodId, comment } = req.body;
  try {
    const product = await Product.findOne({ _id: prodId }).populate('ratings.postedby');
   
    let alreadyRated = product.ratings.find(
      (userId) => userId.postedby.toString() === _id.toString()
    );

    if (alreadyRated) {
      const updateRating = await Product.updateOne(
        {
          ratings: { $elemMatch: alreadyRated },
        },
        {
          $set: { "ratings.$.start": start, "ratings.$.comment": comment },
        },
        {
          new: true,
        }
      );
    } else {

    
      const rateProduct = await Product.findByIdAndUpdate(
        prodId,
        {
          $push: {
            ratings: {
              start: start,
              comment: comment,
              postedby: _id, 
              userName: firstname, // Almacena el nombre del usuario en la calificación
              userLastName: lastname, //
          
         
            },
          },
        },
        {
          new: true,
        }
      );
    }
    const getAllRatings = await Product.findById(prodId);
    let totalRating = getAllRatings.ratings.length;
    let ratingum = getAllRatings.ratings
      .map((item) => item.start)
      .reduce((prev, curr) => prev + curr, 0);
    let actualRating = Math.round(ratingum / totalRating);
    let finalProduct = await Product.findByIdAndUpdate(
      prodId,
      {
        totalrating: actualRating,
      },
      {
        new: true,
      }
    );
    res.json(finalProduct);
  } catch (error) {
    throw new Error(error);
  }
});



module.exports = {
  createProduct,
  getProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishList,
  rating,

};
