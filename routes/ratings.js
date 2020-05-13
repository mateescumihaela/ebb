const express = require('express');
const router  = express.Router({mergeParams: true});
const Company = require('../models/company');
const Rating = require('../models/rating');


router.post('/companies/:id/ratings', (req, res) => {
	Company.findById(req.params.id, (err, company) => {
		if(err) {
			console.log(err);
		} else if (req.body.rating) {
                Rating.create(req.body.rating, (err, rating) => {
				  if(err) {
				    console.log(err);
				  } else {
					rating.author.id = req.session.currentUser._id;
					rating.author.username = req.session.currentUser.username;
					rating.rating = req.body.rating;
				  //save rating
				  rating.save();
				  company.ratings.push(rating);
				  company.save();
				  res.redirect('/companies/' + company._id);
			  }
		  });
	  }
  });
});

module.exports = router;



