const express = require('express');
const router = express.Router();
const { handleRegister } = require('../controllers/registerController')
const { handleLogin } = require('../controllers/loginController')
const { handleRefreshToken } = require('../controllers/refreshTokenController')
const { handleLogout } = require('../controllers/logoutController')
const { getAi } = require('../controllers/getAiController')
const { handleForgotPassword } = require('../controllers/forgotPasswordController')
const { handleResetPassword } = require('../controllers/resetPasswordController')


router.post('/register', handleRegister)
router.post('/login', handleLogin)
router.get('/refresh', handleRefreshToken)
router.get('/logout', handleLogout)
router.post('/ai', getAi)
router.post('/forgot', handleForgotPassword)
router.patch('/reset', handleResetPassword)

module.exports = router