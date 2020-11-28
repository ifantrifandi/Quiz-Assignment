function errorHandler(err, req, res, next) {
  let message = ''
  let status = err.status || 500

  if(err.name === 'SequelizeValidationError') {

    err.errors.forEach(el => {
      
      if(!message) {
        message += el.message
      } else {
        message += `%${el.message}`
      }

    })

  } else if( status === 500) {
    message = 'Internal Server Error'
  }

  if(!message) {
    message = err.message
  }

  res.status(status).json({message})
}

module.exports = errorHandler