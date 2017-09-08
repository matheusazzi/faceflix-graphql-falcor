import * as g from 'graphql'
import * as _ from 'underscore'

import User from './../../models/user'

import UserType from './user_type'

const QueryType = new g.GraphQLObjectType({
  name: 'Query',
  description: 'Query Inicial',

  fields: () => ({
    user: {
      description: 'Retorna um usuário.',
      type: UserType,
      args: {
        id: { type: new g.GraphQLNonNull(g.GraphQLID) }
      },
      resolve: (root, params) => {
        return User.where({ id: params.id }).fetch()
          .then((res) => res.serialize())
      }
    },
    allUsers: {
      description: 'Retorna todos os usuários.',
      type: new g.GraphQLList(UserType),
      args: {
        first: {
          type: g.GraphQLInt,
          description: 'Retorna os N primeiros usuários.'
        },
        last: {
          type: g.GraphQLInt,
          description: 'Retorna os N últimos usuários.'
        }
      },
      resolve: async (root, params) => {
        const res = await User.fetchAll()
        const users = await res.serialize()

        if (params.first) {
          return _.first(users, params.first)
        } else if (params.last) {
          return _.last(users, params.last)
        } else {
          return users
        }
      }
    }
  })
})

export default QueryType
