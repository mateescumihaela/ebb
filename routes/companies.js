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

// GET Details Page
router.get('/:id', function(req, res, next) {
  Company.findOne({ _id: req.params.id }, (err, theCompany) => {
    if (err) {
      return next(err);
    }

    res.render('companies/show', {
      title: `${theCompany.name}`,
    });
  });
});

// GET '/celebrities/:id/edit'
router.get('/:id/edit', function(req, res, next) {
  Celebrity.findOne({ _id: req.params.id }, (err, theCelebrity) => {
    if (err) {
      return next(err);
    }

    res.render('celebrities/edit', {
      title: `Edit ${theCelebrity.name}`,
      celebrity: theCelebrity,
    });
  });
});

// POST '/celebrities/:id'
router.post('/:id', function(req, res, next) {
  const updatedCelebrity = {
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase,
  };
  Celebrity.update(
    { _id: req.params.id },
    updatedCelebrity,
    (err, theCelebrity) => {
      if (err) {
        return next(err);
      }

      res.redirect('/celebrities');
    },
  );
});


  module.exports = router;


