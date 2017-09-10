import * as g from 'graphql'
import * as _ from 'underscore'

import { findById } from './../../models/queries'

import User from './../../models/user'
import Company from './../../models/company'
import Comment from './../../models/comment'
import Title from './../../models/title'

import UserType from './user_type'
import CompanyType from './company_type'
import CommentType from './comment_type'
import TitleType from './title_type'

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
      resolve: (root, params) => findById(User, params.id)
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
    },
    title: {
      description: 'Retorna um título.',
      type: TitleType,
      args: {
        id: { type: new g.GraphQLNonNull(g.GraphQLID) }
      },
      resolve: (root, params) => findById(Title, params.id)
    },
    company: {
      description: 'Retorna uma empresa.',
      type: CompanyType,
      args: {
        id: { type: new g.GraphQLNonNull(g.GraphQLID) }
      },
      resolve: (root, params) => findById(Company, params.id)
    },
    comment: {
      description: 'Retorna um comentário.',
      type: CommentType,
      args: {
        id: { type: new g.GraphQLNonNull(g.GraphQLID) }
      },
      resolve: (root, params) => findById(Comment, params.id)
    }
  })
})

export default QueryType
