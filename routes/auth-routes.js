const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

const User = require('../models/user');

// GET Routes
router.get('/signup', (req, res, next) => {
    try {
        res.render('auth/signup');
    } catch(e) {
        next(e);
    }
});

router.get('/login', (req, res, next) => {
    try {
        res.render('auth/login');
    } catch(e) {
        next(e);
    }
});

router.get('/logout', (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/login');
    })
});

// POST Routes
router.post('/login', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        res.render('auth/login', {
            errorMessage: "Please enter both username and password to login"
        });
        return;
    }

    //check if user exists and if password matches
    User.findOne({'username': username})
    .then(user => {
        if (!user) {
            res.render('auth/login', {
                errorMessage: "Please check your username and password"
            });
            return;
        }
        if (bcrypt.compareSync(password, user.password)) {
            req.session.currentUser = user;
            res.redirect('/');
        } else {
            res.render('auth/login', {
                errorMessage: "Please check your username and password"
            })
        }
    })
});

router.post('/signup', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const dateOfBirth = req.body.dateOfBirth;
    const age = req.body.age;
    const email = req.body.email;
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    
    // Making sure username and password are not empty
    if(username === "" || password === "") {
      res.render("auth/signup", {
        errorMessage: "Indicate a username and password"
      })
      return;
    } 

    // Making sure that user doesn't exist already
    User.findOne({ "username" : username})
    .then( user => {
    if (user) {
        res.render("auth/signup", {
        errorMessage: "The username already exists"
        });
        return;
    }

    User.create({firstName, lastName, dateOfBirth, age, username, password: hashPass, email})
    .then(() => {
        res.redirect('/');
    })
    .catch(error => {
        next(error)
    })
    });
});

 module.exports = router;