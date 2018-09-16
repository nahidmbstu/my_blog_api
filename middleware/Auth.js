const User = require("../models/User");

module.exports = async function(req, res, next) {
  let token = req.header("access_token");
  if (!token) {
    res.send("No Token Provided");
  }

  try {
    const result = await User.find({
      access_token: token
    }).select({ access_token: 1 });

    if (result[0].access_token == token) {
      next();
    } else {
      res.send(" Invalid Token ");
    }
  } catch (err) {
    console.log(err);
  }
};
