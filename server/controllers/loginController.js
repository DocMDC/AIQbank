const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const handleLogin = async (req, res) => {
    const { email, password } = req.body
    // If somehow someone hacks front-end and sends req without email / password
    if ( !email || !password ){
        return res.status(400).json({ 'message': 'Username and password are required' })
    }

    // Find user in database
    const userFound = await UserModel.findOne({ email: email }).exec()
    if (!userFound) return res.sendStatus(401) //Unauthorized

    // Verify password
    const match = await bcrypt.compare(password, userFound.password)

    if (match) {
        // Find roles
        const roles = Object.values(userFound.roles).filter(Boolean)

        // JWT tokens
        const accessToken = jwt.sign(
            {   
                "UserInfo": {
                    "email": userFound.email,
                    "roles": roles
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '10s' }
        )
        const refreshToken = jwt.sign(
            { "email": userFound.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        )
        
        // Save refreshToken with current user
        userFound.refreshToken = refreshToken
        const result = await userFound.save()
        console.log(result)
        console.log(roles)

        // Create cookie with refresh token

        // Send authorization roles and access token 

        res.json({ roles, accessToken})
    }

    else {
        res.sendStatus(401)
    }
}

module.exports = { handleLogin }