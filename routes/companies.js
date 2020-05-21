const express = require('express');
const router = express.Router();
const Company = require('../models/company');

//Homepage
router.get('/companies', (req, res, next) => {
  const currentUser = req.session.currentUser;
  Company.find()
    .then(allCompaniesFromDB => { // <- Backend requesting data from Mongo 
      res.render('companies', { allCompanies: allCompaniesFromDB, currentUser }); 
    })
    .catch(error => {
      next(error);
    });
});


 router.get('/companies/new', (req, res) => {
  const currentUser = req.session.currentUser;
    res.render('companies/new', {
      title: 'Submit a new company',
      currentUser
    });
  }); 


  router.post('/companies', (req, res, next) => {
    const { name, url, image, description } = req.body
    Company.create({ name, url, image, description })
    .then(() => res.redirect('/companies'))
    .catch(err => console.log (`An error ocurred adding a company: ${err}`))
})



router.get('companies/new', (req, res) => {
  const currentUser = req.session.currentUser;
  res.render('/companies', currentUser); 
}); 


// SHOW - shows more info about one company
 router.get('/companies/:id', (req, res) => {
   Company.findById(req.params.id).populate('comments').populate('ratings').exec((err, foundCompany) => {
       if(err){
           console.log(err);
       } else {
        const currentUser = req.session.currentUser;
         let scoreLength = 0;
         let scoreAverage = 0;
           if(foundCompany.ratings.length > 0) {
            scoreLength = foundCompany.ratings.length;
           console.log(scoreLength);
           console.log(foundCompany.ratings);
             const totalRating = foundCompany.ratings.reduce((total, rating) => {
              //  console.log('rating', rating);
              return total + rating.score;
             }, 0);
             console.log('total rating', totalRating);
             scoreAverage = (totalRating / scoreLength).toFixed(2); 
           }
           console.log('Ratings:', foundCompany.ratings);
           console.log('Rating:', foundCompany.rating);
           console.log('scoreAverage', scoreAverage);
           res.render('companies/show', {company: foundCompany, scoreLength, scoreAverage, currentUser});
       }
   });
 });


// EDIT Company ROUTE
router.get('/companies/:id/edit', (req, res, next) => {
	Company.findById(req.params.id)
		.then(foundCompany => res.render('companies/edit', foundCompany))
		.catch(error => {
			next()
			return error
		});
});


// UPDATE Company ROUTE
router.post('/companies/:id/edit', (req, res, next) => {
	const { name, url, image, description } = req.body
	Company.findByIdAndUpdate(req.params.id, { name, url, image, description }, { new: true })
		.then(res.redirect('/companies'))
		.catch(error => {
			next()
			return error
		});
});


// DELETE Company ROUTE
router.post('/companies/:id/delete', (req, res, next) => {
  Company.findByIdAndRemove(req.params.id)
    .then(res.redirect('/companies'))
    .catch(error => {
      next()
      return error
    });
});

  module.exports = router;


