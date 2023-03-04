const express = require('express')
const authController = require('./controller/authController')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:5000'],
  })
)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
//health check
app.get('/', (req, res) => {
  res.send('hello')
})
app.use('/details', authController)

module.exports = app
