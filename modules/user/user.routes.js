const express = require('express')
const router = express.Router()

const { UserOperations } = require('./user.controller')

router.post('/signup', UserOperations.createNewUser)

router.post('/delete', UserOperations.createNewUser)

module.exports = router
