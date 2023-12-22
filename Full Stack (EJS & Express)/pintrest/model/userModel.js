const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  dp: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  posts: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Post',
    default: []
  },
});

userSchema.plugin(plm);

module.exports = mongoose.model('User', userSchema);