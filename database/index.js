require('dotenv').config();
const Sequelize = require('sequelize');

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
  // id is added by default, incrementing from 1
  // userId is added by default, all entries so far are null
  //  - not passing user field into expense records yet
  expense: Sequelize.STRING,
  cost: Sequelize.INTEGER,
  category: Sequelize.STRING,
  frequency: Sequelize.STRING,
  date: Sequelize.DATE
});

const Saving = sequelize.define('saving', {
  item: Sequelize.STRING,
  cost: Sequelize.INTEGER,
  start_date: Sequelize.DATE,
  current_date: Sequelize.DATE,
  end_date: Sequelize.DATE
})

// Loan Database
const Loan = sequelize.define('loan', {
  name: Sequelize.STRING, // card/load name
  minimumPayment: Sequelize.FLOAT, // minimum payment to not get penalty
  balance: Sequelize.FLOAT, // balance on card/loan
  dayBillDue: Sequelize.STRING, // day bill is due
  apr: Sequelize.FLOAT, // interest on card/laod
  autopay: Sequelize.BOOLEAN, // is autopay setup or not
  website: Sequelize.STRING // website link associated to card/loan
});

Loan.belongsTo(User);
User.hasMany(Loan);


const Transaction = sequelize.define('transaction', {
  payment: Sequelize.FLOAT, // if you paid minimum payment or more than the minimum payment 
  paymentDate: Sequelize.DATE // when you made payment
});

Transaction.belongsTo(Loan);
Loan.hasMany(Transaction);

const saveLoan = params => {
  const {name, minimumPayment, balance, dayBillDue, apr, autopay, website, userId} = params
  return Loan.create({
    name, 
    minimumPayment, 
    balance, 
    dayBillDue, 
    apr, 
    autopay, 
    website,
    userId
  })
  .then(() => getLoans({userId: params.userId}) )
  .catch(err => console.log('line 74 db', err));
};

const getLoans = params => Loan.findAll({where: params});

// Save and Get for Transactions

const saveTransaction = params => {
  const {payment, paymentDate, loanId} = params
  Transaction.create({
    payment, paymentDate, loanId
  })
  .then(() => { console.log('stored new loan') });
};

const getTransactionsForMonth = params => {
  var date = new Date(), y = date.getFullYear(), m = date.getMonth();
  var firstDay = new Date(y, m, 1);
  var lastDay = new Date(y, m + 1, 1);
  console.log("params in getTransactionsForMonth in db", params)
  console.log("Here are the first and last day of the current month",firstDay, lastDay)
  return Transaction.findAll({
    where: {
      loanId: params.loanId,
      createdAt: {
        $gt: firstDay,
        $lt: lastDay
      }
    }
  });
};

const getTransactionsLoan = params => {
  console.log("params in getTransactionsLoan in db", params)
  return Transaction.findAll({where: params.loanId});
};

// End of Loan Database

const ListItem = sequelize.define('listItem', {
  listName: Sequelize.STRING,
  itemContent: Sequelize.STRING,
  cost: Sequelize.INTEGER
});

Expense.belongsTo(User);
User.hasMany(Expense, {foreignKey: 'userId', sourceKey: 'id'});

ListItem.belongsTo(User);
User.hasMany(ListItem, {foreignKey: 'userId', sourceKey: 'id'});

Saving.belongsTo(User);
User.hasMany(Saving, {foreignKey: 'userId', sourceKey: 'id'})

const userLogin = (params, callback) => {
  // console.log('logging in ', params);
  const { name, password } = params;
  User.findOne({ where: {name: name, password: password} })
  .then(record => {
    // if there's no match, record is null
    if (record) {
      // if there's a match, record is a big object
      // with more info than we want to send back
      // console.log('matched username in db: ', matchedName);
      const userInfo = {
        userId: record.dataValues.id,
        income: record.dataValues.income
      }
      callback(userInfo);
      // callback(matchedName);
    } else {
      callback(null);
    }
  });
};

// User

const userSignup = (params) => {
  // console.log('saving user to db ', params);
  const { name, password, income, frequency, date } = params;
  User.findOrCreate({
    name, password, income, frequency, date,
    where: { name: !name }
  })
  // .then(() => { console.log('Stored new user') });
};

const saveUser = (params) => {
  // console.log('Saving user to db', params);
  const { name, password, income, frequency, date } = params;
  User.upsert({name, password, income, frequency, date})
  // .then(() => {
  //   console.log('Successfully saved data into db');
  // })
  .catch(err => {
    console.log('Error storing new user to db: ', err);
  })
}

const userUpdate = (params, callback) => {
  // these are split out because all update fields are optional
  // and we don't want to overwrite good data with empty strings
  // - there's probably a better way
  if (params.name) {
    User.update({ name: params.name }, { where: { id: params.id } })
    // .then(() => {
    //   console.log('Updated name record');
    // })
    .catch(err => {
      console.warn('Error storing updated name to db ', err);
    });
  }
  if (params.income) {
    User.update({ income: params.income }, { where: { id: params.id } })
    // .then(() => {
    //   console.log('Updated income record');
    // })
    .catch(err => {
      console.warn('Error storing updated income to db ', err);
    });
  }
  if (params.password) {
    User.update({ password: params.password }, { where: { id: params.id } })
    // .then(() => {
    //   console.log('Updated password');
    // })
    .catch(err => {
      console.warn('Error storing updated password to db ', err);
    });
  }
  // since no fields are required to update,
  // we'll finish with a callback instead of the .thens
  callback(params.id);
};

const updateSavings = (params, callback) => {
  console.log('this is params', params)
  Saving.update({ cost: params.cost }, { where: { userId: params.userId, item: params.item} })
  .catch(err => {
    console.log('Error string updated savings to DB');
  })
}


//Savings
const getSavings = params => Saving.findAll({
  where: {
    userId: params.userId
  }
})

const saveSavingItem = params => {
  const { userId, item, cost, start_date, current_date, end_date } = params;
  User.find({})
  Saving.upsert({
    userId, item, cost, start_date, current_date, end_date
  })
  .then(() => {
    console.log('Succesfully saved Saving into DB');
  })
}

// Expense

const getExpenses = (params) => Expense.findAll({
  where: {
    userId: params.userId
  }
})

const getMonthExpenses = (params) => Expense.findAll({
  where: { 
    userId: params.userId, 
    date: {
      $gte: params.currentMonth,
      $lte: params.nextMonth
    }
  },
  order: [['cost', 'DESC']]
});

const saveExpense = (bill) => {
  console.log('Saving expense to db', bill);
  const { userId, expense, cost, category, frequency, date } = bill;
  User.find({})
  Expense.upsert({
    userId, expense, cost, category, frequency, date
  })
  .then(() => {
    console.log('Successfully saved data into db');
  })
};

const deleteExpense = (bill) => {
  console.log('Deleting expense in db', bill);
  Expense.destroy({
    where: {
      id: bill.id
    }
  })
}

// Loan



// List

// const getListNames = (params) => {};

// const getListItems = (params) => {};

// const addListItem = (item) => {};

// const editListItem = (item) => {};

// const deleteListItem = (item) => {};

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

Loan.belongsTo(User);
User.hasMany(Loan, {foreignKey: 'userId', sourceKey: 'id'});


Expense.belongsTo(User);
User.hasMany(Expense, {foreignKey: 'userId', sourceKey: 'id'});


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
module.exports.getMonthExpenses = getMonthExpenses;
module.exports.saveExpense = saveExpense;
module.exports.deleteExpense = deleteExpense;
module.exports.updateExpense = updateExpense;
module.exports.saveUser = saveUser;
// module.exports.getListNames = getListNames;
// module.exports.getListItems = getListItems;
// module.exports.addListItem  = addListItem;
// module.exports.editListItem = editListItem;
// module.exports.deleteListItem = deleteListItem;
module.exports.saveLoan = saveLoan;
module.exports.getLoans = getLoans;
module.exports.getSavings = getSavings;
module.exports.saveSavingItem = saveSavingItem;
module.exports.updateSavings = updateSavings;
module.exports.getTransactionsForMonth = getTransactionsForMonth
module.exports.getTransactionsLoan = getTransactionsLoan
