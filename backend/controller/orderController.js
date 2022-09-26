import { find } from "../models/orderModel";

const ErrorHandler = require("../utils/errorHandler");
const orderModel = require("../models/orderModel");
const catchAsyncError = require("../middleware/catchAsyncError");

//create new order

const createNewOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const order = await orderModel.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });
  res.status(200).json({
    success: true,
    order,
  });
});

// single order
const getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await orderModel
    .findById(req.params.id)
    .populate("user", "name email");
  if (!order) {
    return next(new ErrorHandler("Order not placed by this id", 404));
  }
  res.status(200).json({
    success: true,
    order,
  });
});
//current user order
const getCurrentUserOrder = catchAsyncError(async (req, res, next) => {
  const order = await find(req.user._id);
  res.status(200).json({
    success: true,
    order,
  });
});
export { createNewOrder, getSingleOrder, getCurrentUserOrder };
