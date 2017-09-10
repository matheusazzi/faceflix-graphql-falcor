import * as g from 'graphql'

import { findById, where, timestamps } from './../../models/queries'

import User from './../../models/user'
import Post from './../../models/post'
import Title from './../../models/title'
import Reaction from './../../models/reaction'

import UserType from './user_type'
import PostType from './post_type'
import TitleType from './title_type'
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
    title: {
      type: TitleType,
      resolve: comment => findById(Title, comment.title_id)
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
