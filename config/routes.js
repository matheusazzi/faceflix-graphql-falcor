const express = require('express')
const router = express.Router()

router.get('/', (_, res) => res.json({ it: 'works!' }))

module.exports = router
