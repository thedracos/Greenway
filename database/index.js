require('dotenv').config();
const Sequelize = require('sequelize');

// below may be needed if Sequelize isn't used
// const { Client } = require('pg');
// const client = new Client();
// client.connect();

// localhost may not be correct/complete
const dbUrl = process.env.DB_URI || localhost;

const sequelize = new Sequelize(dbUrl, {
  dialect: 'postgres'
});

// const sequelize = new Sequelize(process.env.DB_URL);

const User = sequelize.define('user', {
  // will uniqueId be added by default?
  //   make it the primary key for the expense model to associate to?
  name: Sequelize.STRING,
  // salt: implement after OAuth?
  income: Sequelize.INTEGER,
  payday: Sequelize.DATE
});

const Expense = sequelize.define('expense', {
  //   this may be handled by belongsTo below
  // user: {
  //   type: Sequelize.INTEGER,
  //   references: {
  //     model: User,
  //     key: 'id',
  //     deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
  //   }
  // },
  expense_name: Sequelize.STRING,
  cost: Sequelize.INTEGER,
  category: Sequelize.STRING,
  frequency: Sequelize.STRING,
  date: Sequelize.DATE
});

Expense.belongsTo(User);
User.hasMany(Expense);
//   double-check associations
// User.hasMany(Expense, {foreignKey: 'userId', sourceKey: 'id'});

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established');
  })
  .catch(err => {
    console.error('Unable to connect to database:', err);
  });

sequelize.sync();

// const welcomeUser;
// // if the user isn't in the db, store them
// // if they are, retrieve their basic info?
// // user record includes income

// const updateUser;
// // update income? or payday? might be the main use of this

// const getUserExpenses;
// // get all stored expenses for a user

// const storeNewExpense;
// // store a new expense record for a user

// const editExpense;
// // update an existing expense record for a user

// const removeExpense;
// // probably want this ability

// module.exports.welcomeUser = welcomeUser;
// module.exports.updateUser = updateUser;
// module.exports.getUserExpenses = getUserExpenses;
// module.exports.storeNewExpense = storeNewExpense;
// module.exports.editExpense = editExpense;
// module.exports.removeExpense = removeExpense;