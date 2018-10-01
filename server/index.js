const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const database = require('../database');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
app.get('', (request, response) => {
  // database.getUserExpenses
});

// store a new expense record
app.post('/addExpense', (request, response) => {
  console.log(request.body);
  database.saveExpense(request.body);
  response.send('sup');

  //res.status(200).json({
//     results
//   });
// }
  // database.storeNewExpense
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