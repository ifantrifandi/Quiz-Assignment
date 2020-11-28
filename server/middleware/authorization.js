function authorization (req, res, next) {

  if(req.isLoggedIn.id == req.params.id) {
    next()
  } else {
    next({status: 401 , message: 'Tidak Mempunyai Otorisasi'})
  }
  
}

module.exports = authorization