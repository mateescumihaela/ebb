/* const Company = require('../models/company')
const Rating = require('../models/rating')

const middlewareObj = {};

  middlewareObj.checkRatingExists = (req, res, next) => {
    Company.findById(req.params.id).populate("ratings").exec(function(err, company){
      if(err){
        console.log(err);
      }
      for(let i = 0; i < company.ratings.length; i++ ) {
        if(company.ratings[i].author.id.equals(req.session.currentUser._id)) {
          res.send("You already rated this!");
          return res.redirect('/companies/' + company._id);
        }
      }
      next();
    })
  }

   module.exports = middlewareObj; */