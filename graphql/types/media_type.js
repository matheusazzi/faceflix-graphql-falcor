import * as g from 'graphql'

import { findById, timestamps } from './../utils'

import User from './../../models/user'
import Title from './../../models/title'
import Celebrity from './../../models/celebrity'

import UserType from './../types/user_type'
import CelebrityType from './../types/celebrity_type'
import TitleType from './../types/title_type'

const OwnerUnion = () => {
  return new g.GraphQLUnionType({
    name: 'OwnerUnion',
    types: [UserType, CelebrityType, TitleType],

    resolveType(data) {
      if (data.title) {
        return TitleType
      } else if (data.birthday) {
        return CelebrityType
      } else {
        return UserType
      }
    }
  })
}

const MediaType = new g.GraphQLObjectType({
  name: 'Media',

  fields: () => ({
    id: { type: g.GraphQLID },
    imageUrl: {
      type: g.GraphQLString,
      resolve: media => media.image_url
    },
    videoUrl: {
      type: g.GraphQLString,
      resolve: media => media.video_url
    },
    owner: {
      type: OwnerUnion(),
      resolve: media => {
        if (media.attachable_type == 'titles') {
          return where(Title, { id: media.attachable_id })
        } else if (media.attachable_type == 'users') {
          return where(User, { id: media.attachable_id })
        } else if (media.attachable_type == 'celebrities') {
          return where(Celebrity, { id: media.attachable_id })
        }
      }
    },
    createdAt: timestamps('a mídia').createdAt,
    updatedAt: timestamps('a mídia').updatedAt
  })
})

export default MediaType
