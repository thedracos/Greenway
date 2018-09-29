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

const storeUser;

const getUserExpenses;

const storeNewExpense;

const editExpense;

module.exports.storeUser = storeUser;
module.exports.getUserExpenses = getUserExpenses;
module.exports.storeNewExpense = storeNewExpense;
module.exports.editExpense = editExpense;