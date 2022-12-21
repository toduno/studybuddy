const express = require('express')
const router = express.Router()

const {
    signupUser,
    loginUser,
    forgotPassword,
    getResetPassword,
    resetPassword
} = require('../controllers/auth')
const upload = require('../middleware/upload')


router.post('/signup', upload.single('photo'), signupUser) 
router.post('/login', loginUser)
router.post('/forgotPassword', forgotPassword)
router.get('/resetPassword/:id/:token', getResetPassword)
router.patch('/resetPassword/:id/:token', resetPassword)


module.exports = router