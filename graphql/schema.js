import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'

import User from './../models/user'

const UserType = new GraphQLObjectType({
  name: 'User',
  description: '...',

  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: (user) => user.name
    }
  })
})

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: '...',

  fields: () => ({
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: (root, params) => {
        return User.where({ id: params.id }).fetch()
          .then((res) => res.toJSON())
      }
    }
  })
})

export default new GraphQLSchema({
  query: QueryType
})
