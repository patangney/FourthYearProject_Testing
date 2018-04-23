const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema({
  firstname: {
    type: String,
    lowercase: false,
    required: true
  },
  surname: {
    type: String,
    lowercase: false,
    required: true
  },
  username: {
    type: String,
    lowercase: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phonenumber: {
    type: String,
    required: true
  },
  housename: {
    type: String,
    required: false
  },
  addressline1: {
    type: String,
    required: true
  },
  addressline2: {
    type: String,
    required: true
  },
  addressline3: {
    type: String,
    required: false
  },
  county: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin']
  }


});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getAllUsers = function (id, callback) {
  User.find(id, callback);
}

module.exports.getUserById = function (id, callback) {
  User.findById(id, callback);
}

module.exports.roleAuthorisation = function(roles) {
  return function(req, res, next) {
    const user = req.user;
    User.findById(user._id, function(err, foundUser) {
      if (err) {
        res.status(422).json({error: 'No user found'});
        return next(err);
      }
      if (roles.indexOf(foundUser.role) > -1) {
        return next();
      }
      res.status(401).json({error: 'You are not authorised to view this content'});
      return next('Unauthorised');
    });

  }
  
}

module.exports.getUserByUsername = function (username, callback) {
  const query = {
    username: username
  }
  User.findOne(query, callback);
}

module.exports.addUser = function (newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
}
