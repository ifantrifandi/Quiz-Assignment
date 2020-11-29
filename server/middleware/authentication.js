const jwt = require('jsonwebtoken')
const {User} = require('../models')

function authentication (req, res, next) {

  if(req.headers.access_token) {
    try {
      let decoded = jwt.verify(req.headers.access_token, process.env.SECRET_KEY)
      
      if(decoded) {
        req.isLoggedIn = decoded
      
        User.findOne({
          where: {
            id: req.isLoggedIn.id
          }
        })
          .then(data => {
            if(data) {
              next()
            } else {
              throw {status : 401, message: 'Tidak Mempunyai Autentikasi'}
            }
          })
          .catch(next)
      } else {
        throw {status : 401, message: 'Tidak Mempunyai Autentikasi'}
      }
    } catch(err) {
      next(err)
    }
    
  } else {
    next({status : 401, message: 'Tidak Mempunyai Autentikasi'})
  }
}

module.exports = authentication