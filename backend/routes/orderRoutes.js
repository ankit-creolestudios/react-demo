const express = require("express");
const {
  createNewOrder,
  getSingleOrder,
  getCurrentUserOrder,
} = require("../controller/orderController");
const router = express.Router();
router.post("/order/new", createNewOrder);
router.get("/order/:id", getSingleOrder);

router.get("/order", getCurrentUserOrder);
module.exports = router;
