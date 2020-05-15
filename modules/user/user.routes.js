const express = require('express')
const router = express.Router()

const UserOperations = require('./user.model')

router.post('/signup', async (req, res) => {
  const user = req.body.user
  console.log('received object : ', user)
  const response = await UserOperations.createNewUser(user)
  res.status(200).json(response)
})

router.post('/delete', async (req, res) => {
  const username = req.body.user.username
  const response = await UserOperations.deleteUser(username)
  console.log(response)
  if (response.error) {
    res.status(400).json(response)
  } else {
    res.status(200).json(response)
    console.log(response)
  }
})

router.post('/update', async (req, res) => {
  const user = req.body.user
  const response = await UserOperations.updateUser(user)
  if (response.error) {
    res.status(200).json(response)
  } else {
    res.status(200).json(response)
  }
})

router.post('/', async (req, res) => {
  const user = req.body.user
  const response = await UserOperations.findUser(user._id)
  if (response.error) {
    res.status(400).json(response)
  } else {
    res.status(200).json(response)
  }
})

router.get('/:username', async (req, res) => {
  const response = await UserOperations.findUserByUsername(req.params.username)
  if (response.error) {
    res.status(400).json(response)
  } else {
    res.status(200).json(response)
  }
})

router.post('/login', async (req, res) => {
  const user = req.body.user
  const response = await UserOperations.login(user)
  if (response.error) {
    res.status(400).json(response)
  } else {
    res.status(200).json(response)
  }
})

router.get('/search', async (req, res) => {
  const query = req.query.q

  const response = await UserOperations.search(query)

  if (response.status) {
    res.status(200).json(response)
  } else if (response.err) {
    res.status(500).json(response)
  } else {
    res.status(400).json(response)
  }
})

module.exports = router
