const express = require('express');
var mongoose = require('mongoose');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/newuser');
const config = require('../config/database');

// Register 
router.post('/register', (req, res, next) => {
  let newUser = new User({
    firstname: req.body.firstname,
    surname: req.body.surname,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    phonenumber: req.body.phonenumber,
    housename: req.body.housename,
    addressline1: req.body.addressline1,
    addressline2: req.body.addressline2,
    addressline3: req.body.addressline3,
    county: req.body.county,
  })
  // Check if request is valid and not empty or null
  if (req.body.firstname === null || req.body.firstname === '' ||
    req.body.surname === null || req.body.surname === '' ||
    req.body.username === null || req.body.username === '' ||
    req.body.password === null || req.body.password === '' ||
    req.body.phonenumber === null || req.body.phonenumber === '' ||
    req.body.addressline1 === null || req.body.addressline1 === '' ||
    req.body.addressline2 === null || req.body.addressline2 === '' ||
    req.body.county === null || req.body.county === '') {
    res.json({
      success: false,
      message: 'Missing fields!'
    })
  } else {
    User.addUser(newUser, (err, user) => {

      if (err) {
        res.json({
          success: false,
          msg: 'Failed to register user'
        });
      } else {
        res.json({
          success: true,
          msg: 'User Registered'
        });
      }
    })

  }


});

// GET ALL USERS 
 router.get('/admin', function(req, res, next) {
  User.find(function (err, user) {
        if (err) return next(err);
    res.json(user);
   });
 });

 // GET SINGLE User BY ID 
router.get('/admin/:id', function(req, res, next) {
  User.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({
        success: false,
        msg: 'User not found'
      });
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign({
          data: user
        }, config.mongo.secret, {
          expiresIn: 604800 // 1 week
        });
        res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            firstname: user.firstname,
            surname: user.surname,
            username: user.username,
            email: user.email
          }
        })
      } else {
        return res.json({
          success: false,
          msg: 'Wrong password'
        });
      }
    });
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {
  session: false
}), (req, res, next) => {
  res.json({
    user: req.user
  });
});





module.exports = router;
