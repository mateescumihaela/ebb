const express = require('express');
const router = express.Router();

const Company = require('../models/company');

//Homepage
router.get('/company', (req, res, next) => {
  Company.find()
    .then(allCompaniesFromDB => { // <- Backend requesting data from Mongo 
      res.render('companies', { allCompanies: allCompaniesFromDB }); 
      // Backend is responding to the front end with the data from Mongo
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


  module.exports = router;


