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

router.get('/companies/vote', (req, res) => {
    res.render('companies/vote', {
      title: "Vote for your favourite company"
    });
  });


  // CREATE - add new company to DB
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


// SHOW - shows more info about one company
router.get('/companies/:id', async (req, res) => {
  console.log(`route working`)
  const { id } = req.params;
  try {
    const company = await Company.findById(id);
    res.render('companies/show', company);
  } catch (error) {
    console.log(error);
  }  
});  


router.post('/companies/:id/delete', async (req, res, next) => {
  const { id } = req.params;
  try {
    await Company.findByIdAndRemove(id);
    console.log('successfully deleted');
    res.redirect('/companies');
  } catch (error) {
    console.log(error);
  }
});

router.get(`/companies/:id/vote`, async (req, res, next) => {
  const { id } = req.params;
  try {
    const company = await Company.findById(id);
    res.render('companies/vote', company);
  } catch (error){
    console.log(error);
  }
});

router.post('/companies/:id', async (req, res, next) => {
  const { id } = req.params;
  const company = req.body;
  try {
    await Company.findByIdAndUpdate(id, company);
    res.redirect('/companies');
  } catch (error) {
    console.log(error);
  }
});


  module.exports = router;


