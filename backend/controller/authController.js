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

//login
router.post('/login', async (req, res) => {
  let user = await User.findOne({ email: req.body.email })
  if (!user) {
    return res.status(400).send('Oops! NO user existed...')
  } else {
    const passIsValid = bcrypt.compareSync(req.body.password, user.password)
    if (!passIsValid) res.send({ auth: false, token: 'Invalid Password' })
    // in case bot are correct generate token
    let token = jwt.sign({ id: user._id }, config.secret, { expiresIn: 86400 }) //24hr
    res.send({ auth: true, token: token })
  }
})

//user Info
router.get('userInfo', async (req, res) => {
  let token = await req.headers['x-access-token']
  if (!token) res.send({ auth: false, token: 'No Token Provider' })
  //jwt verify
  jwt.verify(token, config.secret, (err, user) => {
    if (err) res.send({ auth: false, token: 'Invalid user' })
    User.findById(user.id, (err, result) => {
      res.send(result)
    })
  })
})
module.exports = router
