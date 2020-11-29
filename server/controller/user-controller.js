const {User} = require('../models')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

class UserController {

  static register(req, res, next) {
    
    User.create({
      username: req.body.username,
      password: req.body.password
    })
      .then((data) => {
        res
          .status(201)
          .json({message: `Username ${data.username} sudah di registrasi`})
      })
      .catch(next)
  }

  static login(req, res, next){
    User.findOne({
      where: {
        username: req.body.username
      }
    })
      .then(data => {
        if(data) {
          const checkPassword = bcrypt.compareSync(req.body.password, data.password);

          if(checkPassword) {
            const access_token = jwt.sign({username: data.username, id: data.id}, process.env.SECRET_KEY)
            res
              .status(200)
              .json({access_token, username: data.username, highest_score: data.highest_score, id: data.id})
          } else {
            next({status: 404, message: 'Username / Password salah'})  
          }
        } else {
          next({status: 404, message: 'Username / Password salah'})
        }
      })
      .catch(next)
  }

  static getLeaderboard(req, res, next){
    User.findAll({
      order: [['highest_score', 'DESC'], ['updatedAt', 'ASC']],
      attributes: {
        exclude: ['password', 'createdAt']
      }
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static patchHighScore(req, res, next) {

    User.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(data => {
        if(data) {

          return User.update({
            highest_score: req.body.highest_score
          },{
            where: {
              id: req.params.id
            }
          })
            .then(data => {
              res.status(200).json({message: 'Kamu berhasil mendapatkan Nilai Tertinggi Baru'})
            })


        } else {
          res.status(404).json({message: 'User Tidak Ketemu!'})
        }
      })
      .catch(next)
    
  }
}

module.exports = UserController