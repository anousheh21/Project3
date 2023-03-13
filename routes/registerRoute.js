const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

router.post('/api/register', async (req, res) => {
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
        // console.log(response)
    } catch (error) {
        console.log(JSON.stringify(error))
        if (error.code === 11000) {
            return res.status(400).json({status: 400, error:'An Account With This Username is Already Taken'})
        }
        throw error
    }
})

module.exports = router
