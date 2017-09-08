import * as g from 'graphql'

import UserType from './../types/user_type'

const OwnerUnion = new g.GraphQLUnionType({
  name: 'OwnerUnion',
  types: [UserType],

  resolveType(data) {
    return UserType
  }
})

export default OwnerUnion
