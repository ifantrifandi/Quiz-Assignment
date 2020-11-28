const express = require('express')
const router = express.Router()
const UserController = require('../controller/user-controller.js')
// const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
// router.use(authentication)
router.get('/leaderboard', UserController.getLeaderboard)
router.patch('/highscore/:id', authorization, UserController.patchHighScore)

module.exports = router