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

app.use('/graphql', graphQLHTTP({
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
