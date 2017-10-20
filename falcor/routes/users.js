import User from './../../models/user'
import Media from './../../models/media'

import {
  serialize,
  whereIn,
  columns
} from './../../models/utils'

import { ref as $ref } from 'falcor-json-graph'

const routes = [{
  route: `usersById[{integers:userIds}][${columns('users')}]`,

  async get(pathSet) {
    const users = await whereIn(User, pathSet.userIds)
    const results = []

    users.forEach((user) => {
      pathSet[2].map((key) => {
        results.push({
          path: ['usersById', user.id, key],
          value: user[key]
        })
      })
    })

    return results
  }
}, {
  route: `usersById[{integers:userIds}].avatar`,

  async get(pathSet) {
    const medias = await Media.query((qb) => {
      qb.where('medias.attachable_id', 'IN', pathSet.userIds)
      qb.where('attachable_type', 'users')
    })
      .fetchAll()
      .then(serialize)

    const results = []

    medias.forEach((media, i) => {
      results.push({
        path: ['usersById', pathSet.userIds[i], 'avatar'],
        value: $ref(['mediasById', media.id])
      })
    })

    return results
  }
}]

export default routes
