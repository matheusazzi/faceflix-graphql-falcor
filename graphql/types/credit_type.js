import * as g from 'graphql'

import { findById, timestamps } from './../../models/queries'

import Title from './../../models/title'
import Celebrity from './../../models/celebrity'

import TitleType from './title_type'
import CelebrityType from './celebrity_type'

const CreditType = new g.GraphQLObjectType({
  name: 'Credit',

  fields: () => ({
    id: { type: g.GraphQLID },
    role: { type: g.GraphQLString },
    title: {
      type: TitleType,
      resolve: credit => findById(Title, credit.title_id)
    },
    celebrity: {
      type: CelebrityType,
      resolve: credit => findById(Celebrity, credit.celebrity_id)
    },
    createdAt: timestamps('o crédito').createdAt,
    updatedAt: timestamps('o crédito').updatedAt
  })
})

export default CreditType
