function errorHandler(err, req, res, next) {
  let message = ''
  let status = err.status || 500
  if(err.name === 'SequelizeValidationError') {
    err.errors.forEach(el => {
      if(!message) {
        message += el.message
      } else {
        if(message !== el.message) {
          message += `%${el.message}`
        }
      }

    })

  } 
  
  if(err.name === 'SequelizeUniqueConstraintError') {
    if(!message) {
      message = err.errors[0].message
    } else {
      message += `%${err.errors[0].message}`
    }
  } 

  if(!message) {
    message = err.message
  }

  res.status(status).json({message})
}

module.exports = errorHandler