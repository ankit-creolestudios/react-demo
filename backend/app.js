const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
const userRoute = require("./routes/userRoutes");
const productRoute = require("./routes/productRoutes");
const orderRoute = require("./routes/orderRoutes");
const cartRoute = require("./routes/cartRoutes");
app.use("/api", userRoute);
app.use("/api", productRoute);
app.use("/api", orderRoute);

app.use("/api", cartRoute);
module.exports = app;
