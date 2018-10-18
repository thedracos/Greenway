require('dotenv').config();
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

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
  .then(() => getLoans({userId: params.userId}))
  .catch(err => console.log('saveLoan, line 78 db', err));
};

const getLoans = params => Loan.findAll({where: params});

const deleteLoan = params => Loan.destroy({
    where: {
      id: params.id
    }
  })
  .then(results => getLoans({userId: params.userId}))
  .catch(err => console.log('Error deleteLoan line 90 db', err));

const updateLoan = params => 
  Loan.update(params, { 
    where: { 
      id: params.id 
    } 
  })
  .then(results => getLoans({userId: params.userId}))
  .catch(err => console.log('Error updateLoan line 98 db', err));
// Save and Get for Transactions

const saveTransaction = params => {
  const {payment, paymentDate, loanId} = params
  Transaction.create({
    payment, paymentDate, loanId
  })
  .then(() => { console.log('stored new loan') });
};

const getTransactionsForMonth = (params, cb) => {
  return this.getLoans(params)
  .then(results => results.map(result => result.dataValues))
  .then(loans => {
    loans.map(loan => {

      let currentDate = new Date(), year = currentDate.getFullYear(), month = currentDate.getMonth();
      let startingDayOfReminder = new Date(year, month - 1, Number(loan.dayBillDue) + 7); // sept 8
      let lastDayOfReminder = new Date(year, month, Number(loan.dayBillDue)); // oct 1
      let weekAfterLastReminder = new Date(year, month, Number(loan.dayBillDue) + 7); // oct 8
      let lastDayOfReminderForNextMonth = new Date(year, month + 1, Number(loan.dayBillDue)); // nov 1

      if (currentDate.getTime() > lastDayOfReminder.getTime() && 
          currentDate.getTime() <= weekAfterLastReminder.getTime()) {

        return Transaction.findAll({
          where: {
            loanId: loan.id,
            createdAt: {
              $gt: startingDayOfReminder,
              $lt: weekAfterLastReminder
            }
          }
        })
        .then(transaction => {
          console.log('line 139 transaction and loan', transaction, loan);
          if (transaction.length === 0) {
            return Promise.resolve({loan: loan, type: 'missed'});
          } else {
            return Promise.resolve({loan: loan, type: 'paid'});
          }
        })
        .catch(err => console.log('Error on line 136 in index.js of DB', err));
      } else if (currentDate.getTime() > weekAfterLastReminder.getTime()) {
        return Transaction.findAll({
          where: {
            loanId: loan.id,
            createdAt: {
              $gt: weekAfterLastReminder,
              $lt: lastDayOfReminderForNextMonth
            }
          }
        })
        .then(transaction => {
          console.log('line 157 transaction and loan', transaction, loan);
          if (transaction.length === 0) {
            return Promise.resolve({loan: loan, type: 'needs payment'});
          } else {
            return Promise.resolve({loan: loan, type: 'paid'});
          }
        })
      }
    })
  })
  // var firstDay = new Date(y, m, 1);
  // var lastDay = new Date(y, m + 1, 1);
  // console.log("params in getTransactionsForMonth in db", params)
  // console.log("Here are the first and last day of the current month",firstDay, lastDay)
  // return Transaction.findAll({
  //   where: {
  //     loanId: params.loanId,
  //     createdAt: {
  //       $gt: firstDay,
  //       $lt: lastDay
  //     }
  //   }
  // });
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

// User

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

const salt = bcrypt.genSaltSync(10);

// this function is not in use?
// const userSignup = (params) => {
//   // console.log('saving user to db ', params);
//   const hashedPass = bcrypt.hash(params.password, salt)
//   // const { name, password, income, frequency, date } = params;
//   const { name, income, frequency, date } = params;
//   User.findOrCreate({
//     name, hashedPass, income, frequency, date,
//     // name, password, income, frequency, date,
//     where: { name: !name }
//   })
//   // .then(() => { console.log('Stored new user') });
// };

const saveUser = (params, callback) => {
  // console.log('Saving user to db', params);

  const password = bcrypt.hashSync(params.password, salt);
  // console.log(password);

  // const { name, password, income, frequency, date } = params;
  const { name, income } = params;

  // User.upsert({name, password, income, frequency, date})
  User.upsert({name, password, income})
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

const updateSavings = (params, cb) => {
  console.log('this is params', params)
  Saving.update(
    { cost: params.cost }, 
    { 
      where: { 
        userId: params.userId, 
        item: params.item, 
        current_date: {
          $gte: params.current_date,
          $lte: params.end_date
        }
      } 
    })
  .then(() =>{
    cb();
  })
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

const getMonthSavings = (params) => Saving.findAll({
  where: { 
    userId: params.userId, 
    current_date: {
      $gte: params.currentMonth,
      $lte: params.nextMonth
    }
  },
  order: [['cost', 'DESC']]
});

const saveSavingItem = (params, cb) => {
  const { userId, item, cost, start_date, current_date, end_date } = params;
  User.find({})
  Saving.upsert({
    userId, item, cost, start_date, current_date, end_date
  })
  .then(() => {
    console.log('Succesfully saved Saving into DB');
    cb();
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

const saveExpense = (bill, cb) => {
  console.log('Saving expense to db', bill);
  const { userId, expense, cost, category, frequency, date } = bill;
  User.find({})
  Expense.upsert({
    userId, expense, cost, category, frequency, date
  })
  .then(() => {
    console.log('Successfully saved data into db');
    cb(bill);
  })
};

const deleteExpense = (bill, cb) => {
  console.log(bill);
  console.log('Deleting expense in db', bill);
  if (bill.frequency === 'Once') {
    Expense.destroy({
      where: {
        expense: bill.expense
      }
    })
    .then(() => {
      cb();
    })
  } else {
    Expense.destroy({
      where: {
        userId: bill.userId,
        expense: bill.expense,
        date: {
          $gte: bill.date
        }
      }
    })
    .then(() => {
      cb();
    })
  }
}

// Loan



// List

// const getListNames = (params) => {};

// const getListItems = (params) => {};

// const addListItem = (item) => {};

// const editListItem = (item) => {};

// const deleteListItem = (item) => {};

//For whatever reason, this is nonfunctional code. It doesn't break our code though.
const updateExpense = (params, cb) => {
  console.log(params);
  Expense.update({
    expense: params.expense,
    cost: params.cost,
    category: params.category,
    frequency: params.frequency,
    date: params.date
  },
  {
    where: {
      userId: params.userId,
      id: params.id
    }
  })
  .then(() => {
    console.log('Succesfully Updated Expense in DB');
    cb();
  })
  .catch(err => {
    console.log('Error string updated savings to DB');
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
// module.exports.userSignup = userSignup;
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
module.exports.getSavings = getSavings;
module.exports.getMonthSavings = getMonthSavings;
module.exports.saveSavingItem = saveSavingItem;
module.exports.updateSavings = updateSavings;

// Loan methods export
module.exports.saveLoan = saveLoan;
module.exports.getLoans = getLoans;
module.exports.deleteLoan = deleteLoan;
module.exports.getTransactionsForMonth = getTransactionsForMonth;
module.exports.getTransactionsLoan = getTransactionsLoan;
module.exports.updateLoan = updateLoan;