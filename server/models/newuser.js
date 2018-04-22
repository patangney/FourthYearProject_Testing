const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema({
  name: {
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
  number: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  address2: {
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

module.exports.getUserById = function (id, callback) {
  User.findById(id, callback);
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
