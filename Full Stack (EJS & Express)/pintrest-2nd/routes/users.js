const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const plm = require("passport-local-mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    // required: true,
  },
  profileImage: String,
  boards: {
    type: Array,
    default: [],
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

userSchema.plugin(plm);

module.exports = mongoose.model("User", userSchema);
