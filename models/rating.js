const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
	rating: Number,
	ratings: {
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Rating'
	},
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		username: String
	}
});

module.exports = mongoose.model('Rating', ratingSchema);