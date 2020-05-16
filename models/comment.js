const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
	text: String,
	createdAt: {type: Date, default:Date.nom},
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
});

module.exports = mongoose.model('Comment', commentSchema);