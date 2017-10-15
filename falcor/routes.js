import _ from 'underscore'
import Router from 'falcor-router'
import jsonGraph from 'falcor-json-graph'

import Post from './../models/post'
import User from './../models/user'
import Media from './../models/media'
import Movie from './../models/movie'
import Comment from './../models/comment'

import {
  serialize,
  findById,
  where,
  whereAll,
  whereIn,
  quote,
  columns
} from './../models/utils'

const $ref = jsonGraph.ref

const FalcorRoutes = new Router.createClass([{
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
  route: `postById[{integers:postIds}].movie[${columns('movies')}]`,

  async get(pathSet) {
    const post = await findById(Post, pathSet.postIds[0])
    const movie = await findById(Movie, post.movie_id)
    const results = []

    pathSet[3].map((key) => {
      results.push({
        path: ['postById', post.id, 'movie', key],
        value: movie[key]
      })
    })

    return results
  }
}, {
  route: `postById[{integers:postIds}].movie.poster[${columns('medias')}]`,

  async get(pathSet) {
    const post = await findById(Post, pathSet.postIds[0])
    const media = await where(Media, {
      attachable_id: post.movie_id,
      attachable_type: 'movies',
      type: 'image'
    })
    const results = []

    pathSet[4].map((key) => {
      results.push({
        path: ['postById', post.id, 'movie', 'poster', key],
        value: media[key]
      })
    })

    return results
  }
}, {
  route: `postById[{integers:postIds}].movie.trailer[${columns('medias')}]`,

  async get(pathSet) {
    const post = await findById(Post, pathSet.postIds[0])
    const media = await where(Media, {
      attachable_id: post.movie_id,
      attachable_type: 'movies',
      type: 'video'
    })
    const results = []

    pathSet[4].map((key) => {
      results.push({
        path: ['postById', post.id, 'movie', 'trailer', key],
        value: media[key]
      })
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
}, {
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
}, {
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
}, {
  route: `mediasById[{integers:mediaIds}][${columns('medias')}]`,

  async get(pathSet) {
    const medias = await whereIn(Media, pathSet.mediaIds)
    const results = []

    medias.forEach((media) => {
      pathSet[2].map((key) => {
        results.push({
          path: ['mediasById', media.id, key],
          value: media[key]
        })
      })
    })

    return results
  }
}])

export default new FalcorRoutes()
