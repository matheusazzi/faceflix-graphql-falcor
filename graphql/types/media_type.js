import * as g from 'graphql'

import User from './../../models/user'

import OwnerUnion from './../unions/owner_union'

const MediaType = new g.GraphQLObjectType({
  name: 'Media',

  fields: () => ({
    id: {
      type: g.GraphQLID
    },
    imageUrl: {
      type: g.GraphQLString,
      resolve: media => media.image_url
    },
    videoUrl: {
      type: g.GraphQLString,
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

export default MediaType
