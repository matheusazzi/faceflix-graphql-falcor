import express from 'express'
import bodyParser from 'body-parser'
import routes from './config/routes'

import graphQLHTTP from 'express-graphql'
import schema from './graphql/schema'

import FalcorServer from 'falcor-express'
import FalcorPostman from 'falcor-postman'
import FalcorRoutes from './falcor/router'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.text({ type: 'text/*' }))
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', routes)

app.use('/graphql', (req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Headers', 'content-type, authorization, content-length, x-requested-with, accept, origin')
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
  res.header('Allow', 'POST, GET, OPTIONS')
  res.header('Access-Control-Allow-Origin', '*')

  if (req.method === 'OPTIONS') {
    res.sendStatus(200)
  } else {
    next()
  }
}, graphQLHTTP({
  schema,
  graphiql: { endpointURL: '/repl' }
}))

if (process.env.NODE_ENV == 'development') {
  app.use(
    '/model.json',
    FalcorServer.dataSourceRoute((req, res) => {
      console.log(req.query && req.query.paths)
      return FalcorRoutes
    })
  )
} else {
  app.use(
    '/model.json',
    FalcorServer.dataSourceRoute((req, res) => FalcorRoutes)
  )
}

app.use(FalcorPostman({
  middlewarePath: '/falcor/repl',
  falcorModelPath: '/model.json',
  app
}))

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({ error: err.message })
})

module.exports = app
