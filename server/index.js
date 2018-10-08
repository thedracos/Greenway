const express = require('express');
const expressGraphQL = require('express-graphql');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const schema = require('./schema.js');
const database = require('../database');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// create entry point to interact with GraphQL
app.use('/graphql', expressGraphQL({
  schema: schema,
  graphiql: true
}));

// Express session
// app.use(session({
//   secret: 'secret',
//   saveUninitialized: true,
//   resave: true
// }));

// Setting up passport google oAuth2.0
// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clinetSecret: process.env.GOOGLE_CLIENT_SECRET,
//    callbackURL: "https://www.greenwaypay.heroku.com"
//   },
//   function (accessToken, refreshToken, profile, cb) {
//   User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));

// app.get('/auth/google',
// passport.authenticate('google', { scope: ['profile'] }));

// app.get('/auth/google/callback',
// passport.authenticate('google', { failureRedirect: '/login' }),
// function(req, res) {
//   // Successful authentication, redirect home.
//   res.redirect('/');
// });

// app.request('', (request, response) => {
// };

// handle google username
// either store new name to db or retrieve associated info?
// app.request('', (request, response) => {
//   // database.welcomeUser
// });

// get expenses assoc to a user
app.post('/api/user/expenses', (request, response) => {
  database.getExpenses(request.body)
  .then(data => {
    response.send(data);
  })
});

// store a new expense record
app.post('/api/expenses', (request, response) => {
  console.log(request.body);
  database.saveExpense(request.body);
  response.send();
});

// remove an expense record
app.delete('/api/expenses', (request, response) => {
  database.deleteExpense(request.body);
  console.log(request.body);
  response.send();
});

// update an expense record
app.put('/api/expenses', (request, response) => {
  database.updateExpense(request.body);
  console.log(request.body);
  response.send();
});

app.post('/api/login', (request, response) => {
  // console.log(request.body);
  database.userLogin(request.body, function(record) {
    const userInfo = {
      userId: record
    }
    console.log('userInfo', userInfo);
    response.send(userInfo);
  });
});

app.post('/api/users', (request, response) => {
  database.saveUser(request.body)
  .then(data => console.log(data));
  // console.log(request.body);
  response.end();
});

app.put('/api/users', (request, response) => {
  database.userUpdate(request.body);
  console.log(request.body);
  response.end();
});

// Serves HTML file for React Router
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'))
})

app.listen(port, () => {
  console.log(`Listening on Port: ${port}`);
});