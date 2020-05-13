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

/* router.get('/companies/vote', (req, res) => {
    res.render('companies/vote', {
      title: 'Vote for your favourite company'
    });
  }); */


  // CREATE - add new company to DB
router.post('/companies', (req, res, next) => {
    const { name, URL, image, description } = req.body;
    const newCompany = new Company({name, URL, image, description, author});
    newCompany.save()
      .then(() => {
        res.redirect('/companies');
      })
      .catch((error) => {
        next(error);
      });
  });

  router.post('/companies', (req, res) => {
    // get data from form and add to companies array
    const name = req.body.name;
    const image = req.body.image;
    const description = req.body.description;
    const author = {
        id: req.user._id,
        username: req.user.username
    }
    const newCompany = {name: name, image: image, description: description, author:author}
    // Create a new company and save to DB
    Company.create(newCompany, (err, newlyCreated) => {
        if(err){
            console.log(err);
        } else {
            //redirect back to companies page
            console.log(newlyCreated);
            res.redirect('/companies');
        }
    });
});

//NEW - show form to create new company
router.get('/new', (req, res) => {
  res.render('companies/new'); 
});


/* router.get('/companies/:id', async (req, res) => {
  console.log(`route working`)
  const { id } = req.params;
  try {
    const company = await Company.findById(id);
    res.render('companies/show', company);
  } catch (error) {
    console.log(error);
  }  
});   */



// SHOW - shows more info about one company

 router.get('/companies/:id', (req, res) => {
   Company.findById(req.params.id).populate('comments').populate('ratings').exec((err, foundCompany) => {
       if(err){
           console.log(err);
       } else {
           if(foundCompany.ratings.length > 0) {
             const ratings = [];
             const length = foundCompany.ratings.length;
             foundCompany.ratings.forEach((rating) => { 
               ratings.push(rating.rating) 
             });
             const rating = ratings.reduce((total, element) => {
               return total + element;
             });
             foundCompany.rating = rating / length;
             foundCompany.save();
           }
           console.log('Ratings:', foundCompany.ratings);
           console.log('Rating:', foundCompany.rating);
           res.render('companies/show', {company: foundCompany});
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
router.get('/companies/:id/vote', async (req, res, next) => {
  const { id } = req.params;
  try {
    const company = await Company.findById(id);
    res.render('companies/vote', company);
  } catch (error){
    console.log(error);
  }
});

  module.exports = router;


