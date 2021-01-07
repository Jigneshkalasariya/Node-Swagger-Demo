const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  commentId: {
    type: Number,
    required: true,
  },
  comments: [Number],
  comtent: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  parent: {
    type: Number,
    trim: true,
  },
});

const Comment = mongoose.model("Comment", commentsSchema);

module.exports = Comment;
