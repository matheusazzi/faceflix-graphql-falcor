import * as g from 'graphql'

import QueryType from './types/query_type'

export default new g.GraphQLSchema({
  query: QueryType
})
