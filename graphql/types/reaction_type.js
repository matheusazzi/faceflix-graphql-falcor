import * as g from 'graphql'

import { findById, where, timestamps } from './../../models/queries'

import User from './../../models/user'
import Post from './../../models/post'
import Comment from './../../models/comment'

import UserType from './user_type'
import PostType from './../types/post_type'
import CommentType from './../types/comment_type'

const ReactionableUnion = () => {
  return new g.GraphQLUnionType({
    name: 'ReactionableUnion',
    types: [PostType, CommentType],

    resolveType(data) {
      if (data.post_id) {
        return CommentType
      } else {
        return PostType
      }
    }
  })
}

const ReactionType = new g.GraphQLObjectType({
  name: 'Reaction',

  fields: () => ({
    id: { type: g.GraphQLID },
    type: { type: g.GraphQLString },
    user: {
      type: UserType,
      resolve: reaction => findById(User, reaction.user_id)
    },
    reactionable: {
      type: ReactionableUnion(),
      resolve: reaction => {
        if (reaction.reactionable_type == 'posts') {
          return where(Post, { id: reaction.reactionable_id })
        } else if (reaction.reactionable_type == 'comments') {
          return where(Comment, { id: reaction.reactionable_id })
        }
      }
    },
    createdAt: timestamps('a reação').createdAt,
    updatedAt: timestamps('a reação').updatedAt
  })
})

export default ReactionType
