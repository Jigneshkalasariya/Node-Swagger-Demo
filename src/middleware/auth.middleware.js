const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const config = require('../config');

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, config.JWT_ACCESS_TOKEN_SECRET_KEY);
    const user = await User.findOne({
      _id: decoded._id,
      "accessTokens.token": token,
    });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = auth;
