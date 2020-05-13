const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
	rating: Number,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;