import Post from './../../models/post'
import Comment from './../../models/comment'

import {
  serialize,
  whereAll,
  findById,
  columns
} from './../../models/utils'

import { ref as $ref } from 'falcor-json-graph'

const routes = [{
  route: `postById[{integers:postIds}][${columns('posts')}]`,

  async get(pathSet) {
    const post = await findById(Post, pathSet.postIds[0])
    const results = []

    pathSet[2].map((key) => {
      results.push({
        path: ['postById', post.id, key],
        value: post[key]
      })
    })

    return results
  }
}, {
  route: `postById[{integers:postIds}].author`,

  async get(pathSet) {
    const post = await findById(Post, pathSet.postIds[0])
    const results = []

    results.push({
      path: ['postById', pathSet.postIds[0], 'author'],
      value: $ref(['usersById', post.user_id])
    })

    return results
  }
}, {
  route: `postById[{integers:postIds}].movie`,

  async get(pathSet) {
    const post = await findById(Post, pathSet.postIds[0])
    const results = []

    results.push({
      path: ['postById', pathSet.postIds[0], 'movie'],
      value: $ref(['moviesById', post.movie_id])
    })

    return results
  }
}, {
  route: `postById[{integers:postIds}].comments[{integers:commentsIndices}]`,

  async get(pathSet) {
    const comments = await whereAll(Comment, {
      post_id: pathSet.postIds[0]
    })
    const results = []

    pathSet.commentsIndices.forEach((index) => {
      if (comments[index]) {
        results.push({
          path: ['postById', comments[0].post_id, 'comments', index],
          value: $ref(['commentsById', comments[index].id])
        })
      }
    })

    return results
  }
}]

export default routes
