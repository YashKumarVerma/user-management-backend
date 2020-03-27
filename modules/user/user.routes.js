const express = require('express')
const router = express.Router()

const { UserOperations } = require('./user.controller')

router.post('/user/signup', UserOperations.createNewUser)

router.delete('/user/delete/:username', UserOperations.deleteUser)

router.patch('/user/update/:username', UserOperations.updateUser)

router.get('/user/:username', UserOperations.findUser)

module.exports = router
