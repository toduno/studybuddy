const express = require('express')
const router = express.Router()
// const passport = require("passport")

const {
    signupUser,
    loginUser,
    forgotPassword,
    getResetPassword,
    resetPassword,
    // loginSuccess,
    // loginFailed,
} = require('../controllers/auth')
const upload = require('../middleware/upload')


router.post('/signup', upload.single('photo'), signupUser) 
router.post('/login', loginUser)

//password reset
router.post('/forgotPassword', forgotPassword)
router.get('/resetPassword/:id/', getResetPassword)
router.patch('/resetPassword/:id/:token', resetPassword)

// //passport auth
// router.get('/login/success', loginSuccess)
// router.get('/login/failed', loginFailed)
// router.get('/auth/google', passport.authenticate("google", {scope: ["profile"] }))
// router.get('/auth/google/callback', passport.authenticate('google', {
//     successRedirect: "http://localhost:3000/",
//     failureRedirect: '/login/failed'
// }))


module.exports = router