// const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
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
    id: {type: GraphQLInt},
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
      resolve(parentValue, args) {
        return database.getExpenses();
      }
    }
  }
});

// add, edit and delete is all done through mutations
// const mutation = new GraphQLObjectType({
//   name: 'Mutation',
//   fields: {
//     addCustomer: {
//       type: CustomerType,
//       args: {
//         // NonNull syntax makes a field required
//         name: {type: new GraphQLNonNull(GraphQLString)},
//         email: {type: new GraphQLNonNull(GraphQLString)},
//         age: {type: new GraphQLNonNull(GraphQLInt)}
//       },
//       resolve(parentValue, args) {
//         // // imported db function, or axios request
//         // return axios.post(endpoint, {
//         //   name: args.name,
//         //   email: args.email,
//         //   age: args.age
//         // })
//         // .then(res => res.data);
//       }
//     },
//     deleteCustomer: {
//       type: CustomerType,
//       args: {
//         id
//       },
//       resolve(parentValue, args) {
//         // // imported db function, or axios request
//         // return axios.post(endpoint, {
//         //   name: args.name,
//         //   email: args.email,
//         //   age: args.age
//         // })
//         // .then(res => res.data);
//       }
//     },
//   }
// });



















// export mutation

module.exports = new GraphQLSchema({
  query: RootQuery
});