const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const ROLES_LIST = require('../config/roles_list')

const handleRegister = async (req, res) => {
    const { email, password } = req.body
    // If somehow someone hacks front-end and sends req without email / password
    if ( !email || !password ){
        return res.status(400).json({ 'message': 'Username and password are required' })
    }

    // Prevent duplicate emails
    const duplicate = await UserModel.findOne({ email: email }).exec()
    if (duplicate) {
        return res.status(409).json({ 'message': 'Email already used'})
    }

    try {
        // Encrypt password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Store new user in database
        const success = await UserModel.create({
            "email": email,
            "roles": {"User": ROLES_LIST.teacher},
            "password": hashedPassword
        })

        console.log(success)

        res.status(201).json({ 'success': `New user with the email ${email} was created!`})
    } catch (err) {
        console.error('Registration failed:', err.message);
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleRegister }