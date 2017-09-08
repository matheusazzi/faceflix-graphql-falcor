import * as g from 'graphql'

import OwnerUnion from './unions/owner_union'

import QueryType from './types/query_type'

export default new g.GraphQLSchema({
  query: QueryType
})
