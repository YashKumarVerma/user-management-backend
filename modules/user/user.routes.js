const express = require('express')
const router = express.Router()

const UserOperations = require('./user.controller')

router.post('/signup', UserOperations.createNewUser)

router.post('/delete/:username', UserOperations.deleteUser)

router.post('/update/:username', UserOperations.updateUser)

router.get('/', UserOperations.findUser)

router.get('/:username', UserOperations.findUserByUsername)

module.exports = router
