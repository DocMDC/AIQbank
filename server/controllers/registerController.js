const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const ROLES_LIST = require('../config/roles_list')
const jwt = require('jsonwebtoken');
require('dotenv').config()

const handleRegister = async (req, res) => {
    const { email, password } = req.body
    // If somehow someone hacks front-end and sends req without email / password
    if ( !email || !password ){
        return res.status(400).json({ message: 'Username and password are required' })
    }

    // Prevent duplicate emails
    const duplicate = await UserModel.findOne({ email: email }).exec()
    if (duplicate) {
        return res.status(409).json({ message: 'Email already used'})
    }

    try {
        // Encrypt password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Store new user in database
        await UserModel.create({
            "email": email,
            "roles": {
                "User": ROLES_LIST.user,
                "Teacher": ROLES_LIST.teacher,
                "Admin": ROLES_LIST.admin,
            },
            "password": hashedPassword,
        })

        // Verify user is in database
        const userFound = await UserModel.findOne({ email: email }).exec()

        // Find roles
        const roles = Object.values(userFound.roles).filter(Boolean)

        //JWT token
        const accessToken = jwt.sign(
            {   
                "UserInfo": {
                    "email": userFound.email,
                    "roles": roles
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '50s' }
        )
        const refreshToken = jwt.sign(
            { "email": userFound.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        )

        // Save refreshToken with current user
        userFound.refreshToken = refreshToken
        await userFound.save()

        // Create cookie with refresh token
        res.cookie('jwt', refreshToken, { httpOnly: true, /*secure: true, sameSite: 'None', */ maxAge: 0.5 * 60 * 60 * 1000 });
        
        // Send authorization roles and access token 
        res.json({ roles, accessToken })

    } catch (err) {
        console.error('Registration failed:', err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { handleRegister }