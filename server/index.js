const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const database = require('../database');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Express session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));


// Setting up passport google oAuth2.0
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clinetSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "https://www.greenwaypay.heroku.com"
},
function (accessToken, refreshToken, profile, cb) {
  User.findOrCreate({ googleId: profile.id }, function (err, user) {
    return cb(err, user);
  });
}

));

app.get('/auth/google',
passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
passport.authenticate('google', { failureRedirect: '/login' }),
function(req, res) {
  // Successful authentication, redirect home.
  res.redirect('/');
});

// app.request('', (request, response) => {
// };

// handle google username
// either store new name to db or retrieve associated info?
// app.request('', (request, response) => {
//   // database.welcomeUser
// });

// update income or other user record info
app.put('', (request, response) => {
  // database.updateUser
});

// get expenses assoc to a user
app.get('/getExpenses', (request, response) => {
  database.getExpenses(request.username)
  .then(data => {
    response.send(data);
  })
});

// store a new expense record
app.post('/addExpense', (request, response) => {
  console.log(request.body);
  database.saveExpense(request.body);
  response.send(request.body);
});

// update an expense record
app.put('', (request, response) => {
  // database.editExpense
});

// remove an expense record
app.delete('', (request, response) => {
  // database.removeExpense
});

app.listen(port, () => {
    console.log(`Listening on Port: ${port}`);
});