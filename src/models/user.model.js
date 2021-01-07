const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require('../config');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error('Password cannot contain "password"');
      }
    },
  },
  accessTokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  refreshToken: {
    type: String,
  },
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.accessTokens;
  delete userObject.refreshToken;

  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, config.JWT_ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: config.JWT_ACCESS_TOKEN_EXPIRE_TIME,
  });
  const refreshToken = jwt.sign(
    { _id: user._id.toString() },
    config.JWT_REFRESH_TOKEN_SECRET_KEY,
    {
      expiresIn: config.JWT_REFRESH_TOKEN_EXPIRE_TIME,
    }
  );

  user.accessTokens = user.accessTokens.concat({ token });
  user.refreshToken = refreshToken;
  await user.save();

  return { accesstoken: token, refreshToken: refreshToken };
};

userSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Password is incorrect");
  }

  return user;
};

// Hash the plain text password before saving
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
