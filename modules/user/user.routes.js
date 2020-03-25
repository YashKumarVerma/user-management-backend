const express = require('express')
const router = express.Router()

const { UserOperations } = require('./user.controller')

router.post('/signup', UserOperations.createNewUser)

router.delete('/delete/:username', UserOperations.createNewUser)

router.patch('/update/:username', UserOperations.updateUser)

module.exports = router
