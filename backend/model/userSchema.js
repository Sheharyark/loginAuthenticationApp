const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: {
    type: String,
    required: ['true', 'Name is required'],
    minlength: 5,
  },
  phone: Number,
  role: String,
})

mongoose.model('users', userSchema)
module.exports = mongoose.model('users')
