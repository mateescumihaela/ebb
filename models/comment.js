const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
	text: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		username: String
	},
	company: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Company'
	}
},{
	timestamps: {
	  createdAt: 'createdAt',
	  updatedAt: 'updatedAt',
	}
  }
);

module.exports = mongoose.model('Comment', commentSchema);