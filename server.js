const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('./models/user')
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
app.post('/api/login', async(req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email}).lean()

    if(!user) {
        return res.status(400).json({status:400, error:'Invalid Username'})
    }

    const payload = {
        id: user._id,
        email: user.email,
        username: user.username

    }

    if (await bcrypt.compare(req.body.password, user.password)) {
        const token = jwt.sign(payload, process.env.JWT_SECRET)
        console.log(token)
        return res.status(200).json({status: 200, data: token})
    } else {
        res.status(400).json({status: 400, error: 'Invalid Password'})
    }
})

app.post('/api/register', async (req, res) => {
    const {email, username, password} = req.body
    if (!email || typeof email !== 'string') {
        return res.status(400).json({status:400, error: 'Invalid Email'})
    }
    if(!username || typeof username !== 'string') {
        return res.status(400).json({status: 400, error:'Invalid Username'})
    }

    if(!password || typeof password !== 'string') {
        return res.status(400).json({status: 400, error:'Invalid Password'})
    }

    const hashedPassword = (await bcrypt.hash(password, 10))

    try {
        const response = await User.create({
            email,
            username,
            password: hashedPassword
        })
        res.status(200).json({status:200})
        console.log(response)
    } catch (error) {
        console.log(JSON.stringify(error))
        if (error.code === 11000) {
            return res.status(400).json({status: 400, error:'An Account With This Username is Already Taken'})
        }
        throw error
    }
})


// Connect to Port
const port = 5000
app.listen(port, () => {
    console.log(`Server Live on Port ${port}`)
})