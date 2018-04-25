const express = require('express');
const path = require('path');
const app = express(); // Initialise Express
const port = process.env.PORT || 3000; //Express Port Number
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose'); // HTTP request logger middleware for node.js
mongoose.Promise = require('bluebird');
const mongoLabs = require('./server/config/database'); // Database config
const morgan = require('morgan');

const userModels = require('./server/models/newuser');
const userRoutes = require('./server/routes/user');


// MongoLabs
mongoose.connect(mongoLabs.mongo.url, { promiseLibrary: require('bluebird') }, (err) => {
  if (err) {
      console.log ('MongoLab Connection Failed! '+err);
  }else {
      console.log ('Connection to MongoLabs: Successful');
  }
});

app.use(morgan('dev')); 
// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));


// Body Parser Middleware
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./server/config/passport')(passport);


// Use routes /api/routes...
app.use('/api', userRoutes);


app.get('*', (req, res) => {
  res.send('Invalid Server Endpoint');
})

// Start Express Server
app.listen(port, () => {
    console.log(`Connection successfull http://localhost:${port} (Express)`);
  });