require('dotenv').config()
const app = require('express')()
const http = require('http').createServer(app)
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

http.listen(process.env.PORT, () => {
  console.log('listening on *:' + process.env.PORT)
})
