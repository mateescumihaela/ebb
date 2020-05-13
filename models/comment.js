const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  comment: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    },
    username: String
  }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;