const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  // dateOfBirth: Date,
  age: Number,
  username: String,
  password: String,
  email: String,
  imgName: String,
  imgPath: {
    type: String,
    default: "images/user-default.png",
  }
},  {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
}
);

const User = mongoose.model('User', userSchema);

module.exports = User;