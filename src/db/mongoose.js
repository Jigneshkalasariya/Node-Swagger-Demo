const mongoose = require("mongoose");
const config = require('../config');

mongoose.connect(config.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}, (err, succ) => {
  if (err) {
    console.log("Error connecting to the database", err)
  }
});
