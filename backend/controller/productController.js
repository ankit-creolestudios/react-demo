const productModel = require("../models/productModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const cloudinary = require("cloudinary");
const ErrorHandler = require("../utils/errorHandler");
//add new product            /api/add-product
const addNewProduct = catchAsyncError(async (req, res) => {
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  const imageLink = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imageLink.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imageLink;
  const product = await productModel.create(req.body);
  res.status(200).json({
    success: true,
    product,
  });
});

//get all product          /api/product
const getAllProduct = catchAsyncError(async (req, res) => {
  const product = await productModel.find();
  res.status(200).json({
    success: true,
    product,
  });
});
//get product detail ------------ /api/product/:id
const getProductById = catchAsyncError(async (req, res) => {
  const product = await productModel.findById(req.params.id);
  res.status(200).json({
    success: true,
    product,
  });
});
//update product         /api/product/:id

const updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await productModel.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  if (images !== undefined) {
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imageLink = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imageLink.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imageLink;
  }

  product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//remove product                         /api/product/:id
const removeProduct = catchAsyncError(async (req, res) => {
  const product = await productModel.findById(req.params.id);
  if (!product) {
    return new ErrorHandler("Product not available", 400);
  }
  console.log(product);
  for (let i = 0; i < product.images.length; i++) {
    console.log(product.images[i]);
    await cloudinary.v2.uploader.destroy(product.images[i], {
      folder: "products",
    });
  }
  product.remove();
  res.status(200).json({
    success: true,
    message: "product remove",
  });
});

module.exports = {
  addNewProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  removeProduct,
};
