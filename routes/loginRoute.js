const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const router = express.Router()

router.post('/api/login', async(req, res) => {
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
        // console.log(token)
        return res.status(200).json({status: 200, data: token})
    } else {
        res.status(400).json({status: 400, error: 'Invalid Password'})
    }
})

module.exports = router