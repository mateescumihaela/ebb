const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    score: Number,
    author: {
		    type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},

	company: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Company'
	}
});

module.exports = mongoose.model('Rating', ratingSchema);