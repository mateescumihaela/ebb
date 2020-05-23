const express = require('express');
const router = express.Router({mergeParams: true}); // pass through params
const Company = require('../models/company');
const Comment = require('../models/comment');
const User = require('../models/user.js');
// Comment NEW route
router.get('/companies/:id/comments/new', (req, res) => {
    //find company by id
    const currentUser = req.session.currentUser;
	Company.findById(req.params.id, (err, company) => {
		if(err){
			console.log(err);
		}else{
			res.render('comments/new', {company: company, currentUser});
		}
	});
});
// Comment CREATE route
router.post('/companies/:id/comments', (req, res) => {
    //lookup company using ID
    //create new comment
    //connect new comment to company
    //redirect to company display page
  //  console.log('im in the comments post route', req.params.id);
    console.log('im the user', req.session.currentUser);
   Company.findById(req.params.id, (err, company) => {
       if(err){
           console.log(err);
           redirect('/companies');
       }else{
           Comment.create(req.body.comment, (err, comment) => {
               if(err){
                   console.log(err);
               } else {
                   //add username and id to comment
                  //  console.log('creating comment', req.session);  
                   comment.author.id = req.session.currentUser._id;
                   comment.company = req.params.id;
                   comment.author.username = req.session.currentUser.username;
                   comment.text = req.body.text;
                   comment.save();
                   company.comments.push(comment);
                   company.save();
                   res.redirect('/companies/' + company._id);
               }
           });
       }
   });
});
// Comment EDIT route
/* router.get('/companies/:id/comments/:comment_id/edit', (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if(err){
            res.redirect("back");
        } else {
          res.render("comments/edit", {company_id: req.params.id, comment: foundComment});
        }
     });
  });
 */


/*  router.get('/companies/:id/comments/:comment_id/edit', (req, res, next) => {
	Comment.findById(req.params.id)
		.then(foundComment => res.render('comments/edit', {company_id: req.params.id, comment: foundComment})
		.catch(error => {
			next()
            return error
		});
});  */

router.post('/companies/:id/comments/:comment_id/edit', (req, res, next) => {
	const { name, url, image, description } = req.body;
	Comment.findByIdAndUpdate(req.params.id, { name, url, image, description }, { new: true })
		.then(res.redirect('/companies'))
		.catch(error => {
			next()
			return error
		});
}); 

// Comment UPDATE route
/* router.put('/companies/:id/comments/:comment_id', (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/companies/" + req.params.id );
        }
     });
  });
   */

module.exports = router;
