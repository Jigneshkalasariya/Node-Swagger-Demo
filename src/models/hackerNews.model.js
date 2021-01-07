const mongoose = require("mongoose");

const hackerNewsDataSchema = new mongoose.Schema({
  hackerId: {
    type: Number,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  website: {
    type: String,
    trim: true,
  },
  author: {
    type: String,
    trim: true,
  },
  points: {
    type: Number,
    default: 0,
  },
  localVote: [String],
  timeStamp: {
    type: Date,
    required: true,
  },
  comments: [Number],
});

const HackerNewsData = mongoose.model("HackerNewsData", hackerNewsDataSchema);

module.exports = HackerNewsData;
