const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../model/userSchema')
const config = require('../config')
const { model, Model } = require('mongoose')
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

//get all user
router.get('/allUsers', async (req, res) => {
  const allUsers = await User.find()
  res.status(200).send({
    status: 'Success',
    data: allUsers,
  })
  //   let allUsers = await User.find({}, (err, data) => {
  //     if (err) throw err
  //     res.send(data)
  //   }).exec()
  //   res.send(allUsers)
})

//register user
router.post('/register', async (req, res) => {
  //encrypt password
  let hashPassword = bcrypt.hashSync(req.body.password, 10)
  let user = await User.findOne({ email: req.body.email })
  if (user) {
    return res.status(400).send('Oops! user already exisits!, Try another one')
  } else {
    // Insert the new user if they do not exist yet
    user = new User({
      email: req.body.email,
      password: hashPassword,
      name: req.body.name,
      phone: req.body.phone,
      role: req.body.role,
    })
    await user.save()
    res.send(user)
  }
})
module.exports = router
