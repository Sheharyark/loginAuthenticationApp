const app = require('./app')
const mongoose = require('mongoose')
const port = 5000
const url = 'mongodb://127.0.0.1:27017/loginApp'
mongoose.connect(url, { useNewUrlParser: true }).then(() => {
  console.log('connection to db is sucessfull')
})

app.listen(port, () => {
  console.log(`app is listening on port ${port}`)
})
