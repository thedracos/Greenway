require('dotenv').config();
const Sequelize = require('sequelize');

// below may be needed if Sequelize isn't used
// const { Client } = require('pg');
// const client = new Client();
// client.connect();

// localhost is not correct/complete
const dbUrl = process.env.DB_URI || localhost;

const sequelize = new Sequelize(dbUrl, {
  dialect: 'postgres'
});

const User = sequelize.define('user', {
  //  id is added by default, incrementing from 1
  //  is it already the primary key for the expense model to associate to?
  //  can confirm after user name is passed in with expense record
  name: Sequelize.STRING,
  password: Sequelize.STRING,
  salt: Sequelize.STRING,
  income: Sequelize.INTEGER,
  frequency: Sequelize.STRING,
  date: Sequelize.DATE
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

  // id is added by default, incrementing from 1
  // userId is added by default, all entries so far are null
  //  - not passing user field into expense records yet
  expense: Sequelize.STRING,
  cost: Sequelize.INTEGER,
  category: Sequelize.STRING,
  frequency: Sequelize.STRING,
  date: Sequelize.DATE
});

Expense.belongsTo(User);
// User.hasMany(Expense);
//   double-check associations

// this might do it already
User.hasMany(Expense, {foreignKey: 'userId', sourceKey: 'id'});

const userLogin = (params, callback) => {
  console.log('logging in ', params);
  const { name, password } = params;
  User.findOne({ where: {name: name, password: password} })
  // GraphQL will also let us confirm the password without having to return it

  .then(record => {
    // if there's no match, record is null
    if (record) {
      // let matchedName = {name: record.dataValues.name};
      // if there's a match, record is a big object
      // with more info than we want to send back

      // console.log('matched username in db: ', matchedName);
      callback(record.dataValues.name);
      // callback(matchedName);
    } else {
      // console.log('this record should be null: ', {name: record});
      // return {name: record};
      callback(null);
    }
  });



  // older notes:
  // .then(() => {
  //   console.log('findOne.then in db.userLogin')
  // });
  // if user name is found,
  // .then can include the findAll query to the Expense db?
};

const userSignup = (params) => {
  console.log('saving user to db ', params);
  const { name, password, income, frequency, date } = params;
  User.findOrCreate({
    name, password, income, frequency, date,
    where: { name: !name }
  })
  .then(() => { console.log('stored new user') });
};

const saveUser = (params) => {
  console.log('saving user to db', params);
  const { name, password, income, frequency, date } = params;
  User.upsert({name, password, income, frequency, date})
  .then(() => {
    console.log('succesfully saved data into db');
  })
  .catch(err => {
    console.log('Error while saving new user. Line 69 index.js in database folder: ', err);
  })
}

const userUpdate = (params) => {
  console.log('finish function to update user record ', params);
  // lower priority after login and signup are connected
};

const getExpenses = (params) => Expense.findAll({
  //where: { username },
  // if (params.username) {...
  // if (params.expense) {...
  order: [['cost', 'DESC']]
});

const saveExpense = (bill) => {
  console.log('saving expenses to db', bill);
  const { expense, cost, category, frequency, date } = bill;
  Expense.upsert({
    expense, cost, category, frequency, date
  })
  .then(() => {
    console.log('successfully saved data into db');
  })
};

const deleteExpense = (bill) => {
  console.log('deleting expense from db', bill);
  Expense.destroy({
    where: {
      id: bill.id
    }
  })
}

//For whatever reason, this is nonfunctional code. It doesn't break our code though.
const updateExpense = (bill) => {
  const { id, expense, cost, category, frequency, date } = bill;
  return Expense.update(
    { expense },
    { cost },
    { category },
    { frequency },
    { date },
    { returning: true, where: { id } },
  )
  .then((data) => {
    if (data[0]) {
      console.log('it worked');
    } else {
      console.log('it didnt work');
    }
  })
}


sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established');
  })
  .catch(err => {
    console.error('Unable to connect to database:', err);
  });

sequelize.sync();

module.exports.userUpdate = userUpdate;
module.exports.userLogin = userLogin;
module.exports.userSignup = userSignup;
module.exports.getExpenses = getExpenses;
module.exports.saveExpense = saveExpense;
module.exports.deleteExpense = deleteExpense;
module.exports.updateExpense = updateExpense;
module.exports.saveUser = saveUser;