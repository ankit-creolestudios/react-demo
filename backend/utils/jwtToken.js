const setJWTToken = (user, statuscode, res) => {
  const token = user.getJWTToken();
  //cookies option set
  const options = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  res.status(statuscode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};
module.exports = setJWTToken;
