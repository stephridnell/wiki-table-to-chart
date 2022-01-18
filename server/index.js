require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('*', cors())

app.use('/table', require('./routes/table'))

app.listen(process.env.PORT, () => {
  console.log('listening on *:' + process.env.PORT)
})
