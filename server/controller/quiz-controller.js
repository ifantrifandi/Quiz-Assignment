const {Quiz} = require('../models')

class QuizController {
  
  static getQuiz(req, res, next) {

    Quiz.findAll({
      order: [['id', 'ASC']]
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static postQuiz(req, res, next) {

    Quiz.create({
      question: req.body.question,
      answer: req.body.answer,
      correct_answer: req.body.correct_answer,
      image_question: req.body.image_question,
      image_loop: req.body.image_loop,
      score: req.body.score,
      type: req.body.type
      })
        .then(data => {
          res.status(201).json({message: 'Pertanyaan Quiz sudah sukses dibuat'})
        })
        .catch(next)
  }
}

module.exports = QuizController