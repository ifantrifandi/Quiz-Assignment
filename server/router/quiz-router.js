const express = require('express')
const router = express.Router()
const QuizController = require('../controller/quiz-controller')
const authentication = require('../middleware/authentication')

router.use(authentication)
router.get('/', QuizController.getQuiz)
router.post('/', QuizController.postQuiz)

module.exports = router