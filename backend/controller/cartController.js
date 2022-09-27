const cartModel = require("../models/cartModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const productModel = require("../models/productModel");

//cartItem
const addNewItemInCart = catchAsyncError(async (req, res) => {
  console.log(req.params);
  const userId = req.params.id;
  const { quantity, product } = req.body;
  const userCart = await cartModel.findOne({ user: userId });
  const productById = await productModel.findById({ id: product });
  console.log(userCart);
  if (userCart) {
    let productIndex = userCart.cartItem.findIndex((p) => p.product == product);

    if (productIndex > -1) {
      let productItem = userCart.cartItem[productIndex];
      productItem.quantity = productItem.quantity + quantity;
      userCart.cartItem[productIndex] = productItem;
      userCart.totalBill =
        userCart.totalBill + userCart.cartItem[productIndex].price;
    } else {
      userCart.cartItem.push({ name, price, quantity, image, product });
    }
    userCart.totalBill = userCart.totalBill + quantity * productById.price;

    userCart = await userCart.save();

    res.status(200).json({ success: true, userCart });
  } else {
    const userCart = await cartModel.create({
      user: userId,
      cartItem: {
        name: productById.name,
        price: productById.price,
        quantity,
        image: productById.image,
        product,
      },
      totalBill: quantity * price,
    });

    res.status(200).json({ success: true, userCart });
  }
  // const cart = await cartModel.create({ cartItem, user: req.user._id });
  // res.status(200).json({
  //   success: true,
  //   cart,
  // });
});

//get cart item
const getAllCartItem = catchAsyncError(async (req, res) => {
  const userId = req.params.id;
  const userCart = await cartModel.findOne({ user: userId });
  res.status(200).json({
    success: true,
    userCart,
  });
});
//remove cart item

const removeCartItem = catchAsyncError(async (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.productId;

  let userCart = await cartModel.findOne({ userId });
  let productIndex = userCart.cartItem.findIndex((p) => p.product == productId);
  if (productIndex > -1) {
    let productItem = userCart.cartItem[productIndex];
    userCart.totalBill -= productItem.quantity * productItem.price;
    userCart.cartItem.splice(productIndex, 1);
  }
  userCart = await userCart.save();
  return res.status(201).send(userCart);
});
module.exports = { addNewItemInCart, getAllCartItem, removeCartItem };
