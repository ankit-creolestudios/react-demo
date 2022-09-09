const app = require("./app");
const cloudinary = require("cloudinary");
const dbConnect = require("./config/dbConnect");

dbConnect();
cloudinary.config({
  cloud_name: "dsn9wmvji",
  api_key: "944796837316258",
  api_secret: "CsFfcyGRENvKTL4EeboatHRIDvc",
  secure: true,
});
app.listen(4000, () => {
  console.log("server");
});
