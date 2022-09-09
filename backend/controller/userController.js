const catchAsyncError = require("../middleware/catchAsyncError");
const userModel = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const setJWTToken = require("../utils/jwtToken");
const cloudinary = require("cloudinary");
//register user         /api/sign-up
const register = catchAsyncError(async (req, res) => {
  //cloudinary return object ,get secure url and public id from it
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });
  const { name, email, password } = req.body;
  //register new user
  const response = await userModel.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  //set jsonweb token and end response
  setJWTToken(response, 200, res);
});
//sigin user               /api/sign-in
const signIn = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Invalid email or Password", 400));
  }
  //find user by email from database if it exist, make password to not return in query
  const userRes = await userModel.findOne({ email: email }).select("+password");

  const plainPassword = await userRes.comparePassword(password);
  console.log(plainPassword, "plain");
  if (!plainPassword) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  setJWTToken(userRes, 200, res);
});
const signOut = catchAsyncError(async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: "true",
    message: "user signout success",
  });
});
const forgetPassword = catchAsyncError(async (req, res, next) => {
  console.log(req.body);
  const userRes = await userModel.findOne({ email: req.body.email });
  if (!userRes) {
    return next(new ErrorHandler("User doesnt available"));
  }
  const resetToken = userRes.getResetPasswordToken();

  await userRes.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/reset-password/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    // await sendEmail({
    //   email: userRes.email,
    //   subject: `Ecommerce Password Recovery`,
    //   message,
    // });
    console.log(message);
    res.status(200).json({
      success: true,
      message: `Email sent to ${userRes.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});
module.exports = { register, signIn, signOut, forgetPassword };
