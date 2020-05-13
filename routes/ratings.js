const express = require('express');
const router  = express.Router({mergeParams: true});
const Company = require('../models/company');
const Rating = require('../models/rating');


router.post('/', (req, res) => {
	Company.findById(req.params.id, (err, company) => {
		if(err) {
			console.log(err);
		} else if (req.body.rating) {
                Rating.create(req.body.rating, (err, rating) => {
				  if(err) {
				    console.log(err);
				  }
				  rating.author.id = req.user._id;
				  rating.author.username = req.user.username;
				  rating.save();
					company.ratings.push(rating);
					company.save();
					req.flash('success', 'Successfully added rating');
				});
		} else {
				req.flash('error', 'Please select a rating');
		}
		res.redirect('/companies/' + company._id);
	});
});

module.exports = router;