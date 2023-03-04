const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../model/userSchema')
const config = require('../config')
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

//get all user
router.get('/allUsers', async (req, res) => {
  let allUsers = await User.find({}, (err, data) => {
    if (err) throw err
    res.send(data)
  })
  res.send(allUsers)
  // User.find({}, (err, data) => {
  //   if (err) throw err
  //   res.send(data)
  // })
})

//register user
router.post('/register', async (req, res) => {
  //encrypt password
  let hashPassword = bcrypt.hashSync(req.body.password, 10)
  let user = await User.findOne({ email: req.body.email })
  if (user) {
    return res.status(400).send('That user already exisits!')
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
  // User.create(
  //   {
  //     email: req.body.email,
  //     password: hashPassword,
  //     name: req.body.name,
  //     phone: req.body.phone,
  //     role: req.body.role,
  //   },
  //   (err, data) => {
  //     if (err) res.status(500).send('error while registering')
  //     res.status(200).send('Registration sucessfull')
  //   }
  // )
})
module.exports = router
