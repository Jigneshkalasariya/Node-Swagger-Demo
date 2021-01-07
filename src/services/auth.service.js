// const express = require("express");
const User = require("../models/user.model");
const auth = require("../middleware/auth.middleware");
const jwt = require("jsonwebtoken");
const config = require("../config");
const logger = require("../config/logger");

register = async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    logger.info(`New user registered : ${req.body.username}`);
    res.status(200).send({ user, token });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

login = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.username,
      req.body.password
    );
    const token = await user.generateAuthToken();
    logger.info(`user Login : ${req.body.username}`);
    res.send({ user, token });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

refreshToken = async (req, res) => {
  var accessToken = req.body.accessToken;
  var refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res.status(401).send({ error: "User is not authenticated" });
  }
  try {
    const decoded = jwt.verify(
      refreshToken,
      config.JWT_REFRESH_TOKEN_SECRET_KEY
    );
    const user = await User.findOne({
      _id: decoded._id,
      refreshToken: refreshToken,
    });

    if (!user) {
      return res.status(401).send({ error: "User is not authenticated" });
    }

    user.accessTokens = user.accessTokens.filter((token) => {
      return token.token !== accessToken;
    });
    await user.save();

    const newAccessToken = jwt.sign(
      { _id: user._id.toString() },
      config.JWT_ACCESS_TOKEN_SECRET_KEY,
      {
        expiresIn: config.JWT_ACCESS_TOKEN_EXPIRE_TIME,
      }
    );

    user.accessTokens = user.accessTokens.concat({ token: newAccessToken });
    await user.save();
    res.status(200).send({ accessToken: newAccessToken });
  } catch (err) {
    console.log(err);
    res.status(401).send({ error: "User is not Authorised" });
  }
};

module.exports = { register, login, refreshToken };
