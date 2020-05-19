const express = require('express');
const router  = express.Router({mergeParams: true});
const Company = require('../models/company');
const Rating = require('../models/rating');



router.post('/companies/:id/ratings', (req, res) => {
	const scoreSched = Number(req.body.ratingSched);
	const scorePay = Number(req.body.ratingPay);
	const scoreMgmt = Number(req.body.ratingMgmt);
	const scoreGrowth = Number(req.body.ratingGrowth);
	const scoreMaternity = Number(req.body.ratingMaternity);
    const totalScore = (scoreSched + scorePay + scoreMgmt + scoreGrowth + scoreMaternity)/5;
// console.log('totalScore', totalScore);
	const companyId = req.params.id;
	const authorId = req.session.currentUser._id;
	Company.findById(companyId, (err, company) => {
		const newRating = new Rating({score: totalScore, user:  req.session.currentUser._id, company: companyId, author: authorId});
		newRating.save((createdRating) => {
			// console.log('saved', createdRating);
			company.ratings.push(newRating);
			company.save();

			res.redirect('/companies/' + companyId);
		});

	});

	return;

	
	Company.findById(req.params.id, (err, company) => {
		if(err) {
			console.log(err);
		} else if (req.body.rating) {
			console.log('ratings', req.body.rating);
                Rating.create(req.body.rating, (err, rating) => {
				  if(err) {
				    console.log('error occurring', err);
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



