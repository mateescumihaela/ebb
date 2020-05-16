const express = require('express');
const router = express.Router();
const Company = require('../models/company');


//Homepage
router.get('/companies', (req, res, next) => {
  Company.find()
    .then(allCompaniesFromDB => { // <- Backend requesting data from Mongo 
      res.render('companies', { allCompanies: allCompaniesFromDB }); 
    })
    .catch(error => {
      next(error);
    });
});



 router.get('/companies/new', (req, res) => {
    res.render('companies/new', {
      title: 'Submit a new company'
    });
  }); 
  router.post('/companies', (req, res, next) => {
    const { name, url, image, description } = req.body

    Company.create({ name, url, image, description })
    .then(() => res.redirect('/companies'))
    .catch(err => console.log (`An error ocurred adding a company: ${err}`))
})


//NEW - show form to create new company
router.get('companies/new', (req, res) => {
  res.render('/companies'); 
}); 

// SHOW - shows more info about one company

 router.get('/companies/:id', (req, res) => {
   Company.findById(req.params.id).populate('comments').populate('ratings').exec((err, foundCompany) => {
       if(err){
           console.log(err);
       } else {
         let scoreLength = 0;
         let scoreAverage = 0;
           if(foundCompany.ratings.length > 0) {
         
            scoreLength = foundCompany.ratings.length;
           
             const totalRating = foundCompany.ratings.reduce((total, rating) => {
               return total + rating.score;
             }, 0);
             console.log('total rating', totalRating);
             scoreAverage = totalRating / scoreLength;
         
           }
           console.log('Ratings:', foundCompany.ratings);
           console.log('Rating:', foundCompany.rating);
           res.render('companies/show', {company: foundCompany, scoreLength, scoreAverage});
       }
   });
 });


// EDIT Company ROUTE
router.get('companies/:id/edit', (req, res) => {
  Company.findById(req.params.id, (err, foundCompany) => {
      res.render('companies/edit', {company: foundCompany});
  });
});

// UPDATE Company ROUTE
router.post('companies/:id', (req, res) => {
  // find and update the correct company
  Company.findByIdAndUpdate(req.params.id, req.body.company, (err, updatedCompany) => {
     if(err) {
         res.redirect('/companies');
     } else {
         //redirect to company details page
         res.redirect('/companies/' + req.params.id);
     }
  });
});

// DESTROY Company ROUTE
router.delete('companies/:id', (req, res) => {
  Company.findByIdAndRemove(req.params.id, (err) => {
     if(err){
         res.redirect('/companies');
     } else {
         res.redirect('/companies');
     }
  });
});

// Company VOTE ROUTE (might remove)
router.get('/companies/:id/new', async (req, res, next) => {
  const { id } = req.params;
  try {
    const company = await Company.findById(id);
    res.render('companies/new', company);
  } catch (error){
    console.log(error);
  }
});

  module.exports = router;


