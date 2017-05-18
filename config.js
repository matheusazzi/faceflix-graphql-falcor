const express = require('express')
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')

const config = (app) => {
  app.use(logger('dev'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(express.static(path.join(__dirname, 'public')))

  app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  app.use((err, req, res, next) => {
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    res.status(err.status || 500)
    res.json({error: err.message})
  })
}

module.exports = config
