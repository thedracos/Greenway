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

app.post('/api/user/monthExpenses', (request, response) => {
  database.getMonthExpenses(request.body)
  .then(data => {
    response.send(data);
  })
});

// store a new expense record
app.post('/api/expenses', (request, response) => {
  // console.log(request.body);
  database.saveExpense(request.body)
  // if we don't tie the response in, it could send the same response
  // even if the db action isn't successful?
  .then(data => {
    response.send(data);
  })
});

// remove an expense record
app.delete('/api/expenses', (request, response) => {
  database.deleteExpense(request.body);
  // if we don't tie the response in, it could send the same response
  // even if the db action isn't successful?
  response.send();
});

// update an expense record
app.put('/api/expenses', (request, response) => {
  database.updateExpense(request.body);
  // if we don't tie the response in, it could send the same response
  // even if the db action isn't successful?
  response.send();
});

app.post('/api/login', (request, response) => {
  database.userLogin(request.body, function(record) {
    // const userInfo = {
    //   username: record
    // }
    console.log(record);
    response.send(record);
  });
});

app.post('/api/users', (request, response) => {
  database.saveUser(request.body)
  .then(data => {
    response.end();
  });
});

app.put('/api/users/update', (request, response) => {
  const updateData = { id: request.body.user };
  if (request.body.newName) { updateData.name = request.body.newName; }
  if (request.body.newPass) { updateData.password = request.body.newPass; }
  if (request.body.newIncome) { updateData.income = request.body.newIncome; }
  database.userUpdate(updateData, function(record) {
    // we could pass the id back but the front end already has it
    // for now, we'll just end the response
    response.end();
  });
});

// store a new loan record
app.post('/api/loans', (request, response) => {
  console.log(request.body);
  database.saveLoan(request.body);
});

app.get('/api/loans/:userId', (request, response) => {
  console.log("gets request", request.params.userId);
  database.getLoans(request.params)
  .then(data => {
    let loans = data.map(loan => loan.dataValues);
    console.log('loans', loans);
    response.send(loans);
  })
});

//SAVINGS 

//Get all Savings
app.post('/api/savings', (request, response) => {
  database.getSavings(request.body)
  .then(data => {
    response.send(data);
  })
})

//Post Saving
app.post('/api/user/savings', (request, response) => {
  console.log('this is request.body', request.body);
  database.saveSavingItem(request.body)
  .then(data => {
    response.end(data);
  })
})

app.put('/api/user/savings', (request, response) => {
  console.log('this is request.body', request.body);
  database.updateSavings(request.body, () => {
    response.end();
  })
})

// end of loan endpoints

app.get('/api/lists', (request, response) => {
});

app.post('/api/lists', (request, response) => {
});

app.put('/api/lists', (request, response) => {
});

app.delete('/api/lists', (request, response) => {
});

// Serves HTML file for React Router
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'))
})

app.listen(port, () => {
  console.log(`Listening on Port: ${port}`);
});