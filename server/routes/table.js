const express = require('express')
const router = express.Router()

// GET all tables from wiki URL
router.get('/', async (_req, res) => {
  res.json(':)')
})

module.exports = router
