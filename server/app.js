const express = require('express')
const app = express()
const port = process.env.PORT || 3000 
const cors = require('cors')
const routes = require('./router')

if(process.env.NODE_ENV !== 'production') { 
  require('dotenv').config() 
}
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(routes)

app.listen(port, () => {
  console.log(`Listening in Port ${port}`)
})



