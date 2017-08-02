const express = require('express')
const router = express.Router()
const User = require('./models/user')

router.get('/', (req, res) => {
  User.fetchAll()
    .then((users) => res.json({ users: users }))
})

module.exports = router
