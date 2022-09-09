const express = require("express");
const {
  getAllProduct,
  addNewProduct,
  getProductById,
  updateProduct,
  removeProduct,
} = require("../controller/productController");

const router = express.Router();

router.get("/product", getAllProduct);
router.post("/add-product", addNewProduct);
router.get("/product/:id", getProductById);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", removeProduct);
module.exports = router;
