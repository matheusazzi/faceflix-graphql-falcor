import * as g from 'graphql'

import { findById, where, timestamps } from './../utils'

import User from './../../models/user'
import Post from './../../models/post'
import Movie from './../../models/movie'
import Reaction from './../../models/reaction'

import UserType from './user_type'
import PostType from './post_type'
import MovieType from './movie_type'
import ReactionType from './reaction_type'

const CommentType = new g.GraphQLObjectType({
  name: 'Comment',

  fields: () => ({
    id: { type: g.GraphQLID },
    body: { type: g.GraphQLString },
    user: {
      type: UserType,
      resolve: comment => findById(User, comment.user_id)
    },
    post: {
      type: PostType,
      resolve: comment => findById(Post, comment.post_id)
    },
    movie: {
      type: MovieType,
      resolve: comment => findById(Movie, comment.movie_id)
    },
    reactions: {
      type: new g.GraphQLList(ReactionType),
      resolve: comment => where(Reaction, {
        reactionable_id: comment.id, reactionable_type: 'comments'
      })
    },
    createdAt: timestamps('o comentário').createdAt,
    updatedAt: timestamps('o comentário').updatedAt
  })
})

export default CommentType
