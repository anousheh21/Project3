const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('./models/user')
const registerRouter = require('./routes/registerRoute')
const loginRouter = require('./routes/loginRoute')
require('dotenv').config()
// console.log(process.env.JWT_SECRET)

// Connects to MongoDB database
mongoose.connect(process.env.CONNECT_DB)

// Middleware
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/', express.static('./public'))
//app.use('/', express.static('./images'))

// Requests
app.use(registerRouter)
app.use(loginRouter)



// Connect to Port
const port = 5000
app.listen(port, () => {
    console.log(`Server Live on Port ${port}`)
})