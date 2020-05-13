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
  imgName: String,
  imgPath: String,
  // company: {type: Schema.ObjectId, ref:'Company'},
//   company: {
//     id: {
//        type: mongoose.Schema.Types.ObjectId,
//        ref: "Company"
//     },
//     username: String
//  },
//  comments: [
//     {
//        type: mongoose.Schema.Types.ObjectId,
//        ref: "Comment"
//     }
//  ],
//  ratings: [
//     {
//        type: mongoose.Schema.Types.ObjectId,
//        ref: "Rating"
//     }
//  ],
},  {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
}
);

const User = mongoose.model('User', userSchema);

module.exports = User;