const express = require('express')
const router = express.Router()

const {
    signupUser,
    loginUser
} = require('../controllers/auth')
const upload = require('../middleware/upload')


router.post('/signup', upload.single('photo'), signupUser) 
router.post('/login', loginUser)


module.exports = router