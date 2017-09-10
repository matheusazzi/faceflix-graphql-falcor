import * as g from 'graphql'

import { findById, where, timestamps } from './../../models/queries'

import User from './../../models/user'
import Comment from './../../models/comment'
import Title from './../../models/title'
import Reaction from './../../models/reaction'

import UserType from './user_type'
import CommentType from './comment_type'
import TitleType from './title_type'
import ReactionType from './reaction_type'

const PostType = new g.GraphQLObjectType({
  name: 'Post',

  fields: () => ({
    id: { type: g.GraphQLID },
    body: { type: g.GraphQLString },
    author: {
      type: UserType,
      resolve: post => findById(User, post.user_id)
    },
    title: {
      type: TitleType,
      resolve: post => findById(Title, post.title_id)
    },
    comments: {
      type: new g.GraphQLList(CommentType),
      resolve: post => where(Comment, {post_id: post.id})
    },
    reactions: {
      type: new g.GraphQLList(ReactionType),
      resolve: post => where(Reaction, {
        reactionable_id: post.id, reactionable_type: 'posts'
      })
    },
    createdAt: timestamps('a postagem').createdAt,
    updatedAt: timestamps('a postagem').updatedAt
  })
})

export default PostType