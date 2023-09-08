const express = require('express');
const router = express.Router();
const { handleRegister } = require('../controllers/registerController')
const { handleLogin } = require('../controllers/loginController')

router.post('/register', handleRegister)
router.post('/login', handleLogin)

module.exports = router