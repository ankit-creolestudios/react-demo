const express = require("express");
const {
  addNewItemInCart,
  getAllCartItem,
} = require("../controller/cartController");
const router = express.Router();

router.post("/cart/:id", addNewItemInCart);
router.get("/cart", getAllCartItem);

module.exports = router;
