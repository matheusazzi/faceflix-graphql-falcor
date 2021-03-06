import * as g from 'graphql'

import { timestamps, where, whereAll } from './../utils'

import Media from './../../models/media'
import User from './../../models/user'
import Comment from './../../models/comment'
import Post from './../../models/post'
import Favorite from './../../models/favorite'
import Reaction from './../../models/reaction'
import Recommendation from './../../models/recommendation'

import MediaType from './media_type'
import CommentType from './comment_type'
import PostType from './post_type'
import FavoriteType from './favorite_type'
import ReactionType from './reaction_type'
import RecommendationType from './recommendation_type'

const UserType = new g.GraphQLObjectType({
  name: 'User',

  fields: () => ({
    id: { type: g.GraphQLID },
    name: { type: g.GraphQLString },
    email: { type: g.GraphQLString },
    gender: {
      type: g.GraphQLString,
      description: 'Retorna "male" ou "female"'
    },
    avatar: {
      type: MediaType,
      description: 'Foto do usuário.',
      resolve: user => where(Media, {
        attachable_id: user.id,
        attachable_type: 'users'
      })
    },
    friends: {
      type: new g.GraphQLList(UserType),
      resolve: user => {
        return User.query((qb) => {
          qb.innerJoin('friendships', 'users.id', 'friendships.user_one_id')
          qb.where('friendships.user_two_id', user.id)
          qb.where('friendships.status', 'approved')
        })
          .fetchAll()
          .then((movies) => movies.serialize())
      }
    },
    comments: {
      type: new g.GraphQLList(CommentType),
      resolve: user => whereAll(Comment, {user_id: user.id})
    },
    posts: {
      type: new g.GraphQLList(PostType),
      resolve: user => whereAll(Post, {author_id: user.id})
    },
    favorites: {
      type: new g.GraphQLList(FavoriteType),
      resolve: user => whereAll(Favorite, {user_id: user.id})
    },
    reactions: {
      type: new g.GraphQLList(ReactionType),
      resolve: user => whereAll(Reaction, {
        reactionable_id: user.id, reactionable_type: 'users'
      })
    },
    recommendations: {
      type: new g.GraphQLList(RecommendationType),
      resolve: user => whereAll(Recommendation, { user_id: user.id })
    },
    createdAt: timestamps('o usuário').createdAt,
    updatedAt: timestamps('o usuário').updatedAt
  })
})

export default UserType
