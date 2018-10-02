const express = require('express');
const expressGraphQL = require('express-graphql');
const path = require('path');
const bodyParser = require('body-parser');
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