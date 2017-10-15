import * as g from 'graphql'
import _ from 'underscore'

import { findById, whereAll, timestamps } from './../utils'

import User from './../../models/user'
import Comment from './../../models/comment'
import Movie from './../../models/movie'
import Reaction from './../../models/reaction'

import UserType from './user_type'
import CommentType from './comment_type'
import MovieType from './movie_type'
import ReactionType from './reaction_type'

const PostType = new g.GraphQLObjectType({
  name: 'Post',

  fields: () => ({
    id: { type: g.GraphQLID },
    body: { type: g.GraphQLString },
    author: {
      type: UserType,
      description: 'Autor do filme.',
      resolve: post => findById(User, post.user_id)
    },
    movie: {
      type: MovieType,
      resolve: post => findById(Movie, post.movie_id)
    },
    comments: {
      type: new g.GraphQLList(CommentType),
      args: {
        first: { type: g.GraphQLInt },
        last: { type: g.GraphQLInt }
      },
      resolve: async (post, params) => {
        const data = await whereAll(Comment, { post_id: post.id })

        if (params.first) {
          return _.first(data, params.first)
        } else if (params.last) {
          return _.last(data, params.last)
        } else {
          return data
        }
      }
    },
    reactions: {
      type: new g.GraphQLList(ReactionType),
      resolve: post => whereAll(Reaction, {
        reactionable_id: post.id, reactionable_type: 'posts'
      })
    },
    createdAt: timestamps('a postagem').createdAt,
    updatedAt: timestamps('a postagem').updatedAt
  })
})

export default PostType
