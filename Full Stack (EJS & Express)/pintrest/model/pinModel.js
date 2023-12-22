const mongoose = require("mongoose");

const pinSchema = new mongoose.Schema({
  title: String,
  imageUrl: {
    type: String,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Pin = mongoose.model("Pin", pinSchema);

module.exports = Pin;
