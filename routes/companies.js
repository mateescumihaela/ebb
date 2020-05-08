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
      title: "Submit a new company"
    });
  });

  router.post('/companies', (req, res, next) => {
    const { name, URL, image, description } = req.body;
    const newCompany = new Company({name, URL, image, description});
  
    newCompany.save()
      .then(() => {
        res.redirect('/companies');
      })
      .catch((error) => {
        next(error);
      });
  });

  // SHOW - shows more info about each company
router.get('/:id', function(req, res) {
  // find company with provided ID
  Company.findById(req.params.id).populate('comments').exec(function(err, foundCompany){
    if (err) {
      console.log(err);
    } else {
      console.log(foundCompany);
      // render show template with that company
      res.render('companies/show', {company: foundCompany});
    }
  });
});


  module.exports = router;


