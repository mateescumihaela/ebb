const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
	rating: Number,
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

module.exports = mongoose.model('Rating', ratingSchema);