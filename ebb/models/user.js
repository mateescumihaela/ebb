const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  dateOfBirth: Date,
  age: Number,
  username: String,
  password: String,
  email: String,
  image: Image,
},  {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
}
);

const User = mongoose.model('User', userSchema);

module.exports = User;