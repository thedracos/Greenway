// const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');
const database = require('../database');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    // id: {type: GraphQLString},
    name: {type: GraphQLString},
    income: {type: GraphQLInt},
    payday: {type: GraphQLString}
  })
});

const ExpenseType = new GraphQLObjectType({
  name: 'Expense',
  fields: () => ({
    id: {type: GraphQLID},
    // user: {type: GraphQLInt},
    expense: {type: GraphQLString},
    cost: {type: GraphQLInt},
    category: {type: GraphQLString},
    frequency: {type: GraphQLString},
    date: {type: GraphQLString},
    createdAt: {type: GraphQLString},
    updatedAt: {type: GraphQLString}
  })
});

// stores different queries
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // initial
    user: {
      type: UserType,
      args: {
      },
      resolve(parentValue, args) {
        // return axios.get()
        //   .then(res => res.data);
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        // return axios.get()
        //   .then(res => res.data);
      }
    },
    // in progress - isn't set up to query from args yet
    // type also refers to returning 1 record and not a list of records
    expense: {
      type: ExpenseType,
      args: {
        // expense: {type: GraphQLString},
        // category: {type: GraphQLString}
      },
      resolve(parentValue, args) {
        // return axios.get()
        //   .then(res => res.data);
      }
    },
    // right now this gets all expenses from the db
    //   (users aren't connected to expenses yet)
    expenses: {
      type: new GraphQLList(ExpenseType),
      args: {
        expense: {type: GraphQLString},
        category: {type: GraphQLString}
      },
      resolve(parentValue, args) {
        return database.getExpenses();
        // return database.getExpenses('params?');
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addExpense: {
      type: ExpenseType,
      args: {
        expense: {type: new GraphQLNonNull(GraphQLString)},
        cost: {type: new GraphQLNonNull(GraphQLInt)},
        category: {type: GraphQLString},
        frequency: {type: GraphQLString},
        date: {type: GraphQLString}
      },
      resolve(parentValue, args) {
        // import db function
        // finish db function
        return database.saveExpense(argument);
        console.log('args ', args);
        console.log('parentValue ', parentValue);
      }
    },
    deleteExpense: {
      type: ExpenseType,
      args: {
        id: {type: GraphQLID},
        expense: {type: GraphQLString},
        cost: {type: GraphQLInt},
        category: {type: GraphQLString},
        frequency: {type: GraphQLString},
        date: {type: GraphQLString}
      },
      resolve(parentValue, args) {
        // import db function
        // finish db function
        return database.removeExpense(argument);
        console.log('args ', args);
        console.log('parentValue ', parentValue);
      }
    },
    editExpense: {
      type: ExpenseType,
      args: {
        expense: {type: GraphQLString},
        cost: {type: GraphQLInt},
        category: {type: GraphQLString},
        frequency: {type: GraphQLString},
        date: {type: GraphQLString}
      },
      resolve(parentValue, args) {
        // import db function
        // finish db function
        return database.editExpense(argument);
        console.log('args ', args);
        console.log('parentValue ', parentValue);
      }
    }
  }
});

// export mutation
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});