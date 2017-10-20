import Comment from './../../models/comment'

import {
  whereIn,
  columns
} from './../../models/utils'

import { ref as $ref } from 'falcor-json-graph'

const routes = [{
  route: `commentsById[{integers:commentIds}][${columns('comments')}]`,

  async get(pathSet) {
    const comments = await whereIn(Comment, pathSet.commentIds)
    const results = []

    comments.forEach((comment) => {
      pathSet[2].map((key) => {
        results.push({
          path: ['commentsById', comment.id, key],
          value: comment[key]
        })
      })
    })

    return results
  }
}, {
  route: `commentsById[{integers:commentIds}].user`,

  async get(pathSet) {
    const comments = await whereIn(Comment, pathSet.commentIds)
    const results = []

    comments.forEach((comment, i) => {
      results.push({
        path: ['commentsById', pathSet.commentIds[i], 'user'],
        value: $ref(['usersById', comment.user_id])
      })
    })

    return results
  }
}]

export default routes
