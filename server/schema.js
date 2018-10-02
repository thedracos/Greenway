const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

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

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {
      },
      resolve(parentValue, args) {
        return axios.get(process.env.DB_URI)
          .then(res => res.data);
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return axios.get(process.env.DB_URI)
          .then(res => res.data);
      }
    },
    expense: {
      type: ExpenseType,
      args: {
      },
      resolve(parentValue, args) {
        return axios.get(process.env.DB_URI)
          .then(res => res.data);
      }
    },
    expenses: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return axios.get(process.env.DB_URI)
          .then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});