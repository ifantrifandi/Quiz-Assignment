const express = require('express')
const router = express.Router()
const UserRouter = require('./user-router')
const QuizRouter = require('./quiz-router')
const errorHandler = require('../middleware/error-handler')

router.use('/', UserRouter)
router.use('/quiz', QuizRouter)

router.use(errorHandler)

module.exports = router