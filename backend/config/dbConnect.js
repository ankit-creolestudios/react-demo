const mongoose = require("mongoose");
const dbConnect = () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  mongoose
    .connect(process.env.DB_LOCAL_URL, {
      useNewUrlParser: true,
    })
    .then((res) => console.log("database connect"));
};

module.exports = dbConnect;
