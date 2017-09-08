import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLUnionType
} from 'graphql'

import _ from 'underscore'

import User from './../models/user'
import Media from './../models/media'

const MediaType = new GraphQLObjectType({
  name: 'Media',

  fields: () => ({
    id: {
      type: GraphQLID
    },
    imageUrl: {
      type: GraphQLString,
      resolve: media => media.image_url
    },
    videoUrl: {
      type: GraphQLString,
      resolve: media => media.video_url
    },
    owner: {
      type: OwnerUnion,
      resolve: media => {
        return User.where({id: media.attachable_id})
          .fetch().then((res) => res.serialize())
      }
    }
  })
})

const UserType = new GraphQLObjectType({
  name: 'User',

  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    gender: {
      type: GraphQLString,
      description: 'Retorna "male" ou "female"'
    },
    createdAt: {
      type: GraphQLString,
      description: 'Data de criação do usuário.',
      resolve: user => user.created_at
    },
    updatedAt: {
      type: GraphQLString,
      description: 'Data da última alteração no usuário.',
      resolve: user => user.updated_at
    },
    avatar: {
      type: MediaType,
      description: 'Foto do usuário.',
      resolve: user => {
        return Media.where({attachable_id: user.id, attachable_type: 'users'})
          .fetch().then((res) => res.serialize())
      }
    }
  })
})

const OwnerUnion = new GraphQLUnionType({
  name: 'OwnerUnion',
  types: [UserType],

  resolveType(data) {
    return UserType
  }
})

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Query Inicial',

  fields: () => ({
    user: {
      description: 'Retorna um usuário.',
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve: (root, params) => {
        return User.where({ id: params.id }).fetch()
          .then((res) => res.serialize())
      }
    },
    allUsers: {
      description: 'Retorna todos os usuários.',
      type: new GraphQLList(UserType),
      args: {
        first: {
          type: GraphQLInt,
          description: 'Retorna os N primeiros usuários.'
        },
        last: {
          type: GraphQLInt,
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

export default new GraphQLSchema({
  query: QueryType
})
