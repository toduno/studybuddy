const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator')
const sendEmail = require('../utils/sendEmail')

//reusable function that signs the token for the user signup and login
const createToken = (_id) => {
   return jwt.sign({_id}, process.env.SECRET, {  expiresIn: '10d' })
}


const signupUser =  async(req, res, next) => {
    let { firstName, lastName, username, email, password } = req.body

    try {
        //validation
        if (!firstName || !lastName || !username || !email || !password) {
            throw Error('All fields must be filled!')
        }
        if (!validator.matches(firstName || lastName, '^[a-zA-Z_.-]*$')) {
            throw Error('Invalid name')
        }
        if (!validator.matches(username, '^[a-zA-Z0-9_.-]*$')) {
            throw Error('Invalid username')
        }
        if (!validator.isEmail(email)) {
            throw Error('Invalid email address')
        }
        if (!validator.isStrongPassword(password)) {
            throw Error('Weak password') 
        }

        //check if user exists and create new
        const takenUsername = await User.findOne({username})
        const takenEmail = await User.findOne({email})

        if (takenUsername || takenEmail) {
            res.json({message: 'Username or email already exist!'})
        } 
        else {
            password = await bcrypt.hash(password, 12)
        
            const user = new User({
                firstName,
                lastName,
                username,
                email,
                password
            })
            if(req.file) {
                user.photo = req.file.filename
            }

        
            const saveNewUser = await user.save()
            const token = createToken(user._id)  //to authenticate user

            const {_id, photo} = user //gets these from the user database to send back to the client

            res.status(200).json({email, token, _id, username, photo}) 
        } 

    } catch(error) {
        res.status(400).json({error: error.message})
    }
}


//@desc Authenticate a user
//@route POST /login
//@access Public 
const loginUser = async(req, res) => {
   const { email, password } = req.body

   try {
        const user = await User.login(email, password) //executes the .login() mongoose static method 

        //create token
        const token = createToken(user._id)

        const { _id, username, photo } = user //gets these from the user database (using the .login() static method user variable 
        //used when getting user details from the db or the user here) to also send back to the client
        
        res.status(200).json({email, token, _id, username, photo})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


//@desc Reset a user Password
//@route POST /forgotPassword
//@access Public 
const forgotPassword = async(req, res) => {
    const { email } = req.body
 
    try {
     const user = await User.forgotPassword(email) //executes the .forgotPassword() mongoose static method 
     const { _id } = user

     //create token
     const token = createToken(_id) //token will be used to authenticate the user when resetting the password

     const link = `http://localhost:3000/resetPassword/${_id}/${token}`
     await sendEmail(email, 'Password Reset', link)
     console.log(link)

     res.status(200).json('Password reset link has been sent to your account!')

     } catch (error) {
         res.status(400).json({error: error.message})
         console.log(error)
     }
 }


//@desc Reset a User Password
//@route GET /resetPassword/:id
//@access Public
 const getResetPassword = async(req, res) => { 
    const {id} = req.params
    
   try {
    //check if user exists
    const user = await User.findById(req.params.id)
    if (!user) {
        throw Error('User does not exist!')
    }

    //create token
    const token = createToken(id) //send the token to the :token in req.params of /resetPassword/:id url
    // POST request on submit

    res.status(200).json({token})

   } catch (error) {
        res.status(400).json({error: error.message})
        console.log(error)
   }  
}


//@desc Reset a User Password
//@route PATCH /resetPassword/:id/:token
//@access Public
const resetPassword = async(req, res) => {
    console.log(req.body)

     //hash the password while updating
    const { password } = req.body
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    try{
        //validation
        if (!password) {
            throw Error('All fields must be filled')
        }
        if (!validator.isStrongPassword(password)) {
            throw Error('Weak password') 
        }

        //check if user exists and update
        const body = {
            ...req.body,
            password: hash
        }
        const token = req.params

        if (!token) return res.status(400).send('Not verified!')

        const updateUser = await User.findByIdAndUpdate({_id: req.params.id}, body, {new: true}) 
        if (!updateUser) {
            throw Error('Invalid or expired link!')
        }

        res.status(201).json('Password reset was successful!')

    } catch(error) {
        res.status(400).json({error: error.message})
        console.log(error)
    }
}


//@desc User login success (using passport.js)
//@route GET /login/success
//@access Public
const loginSuccess = async(req, res) => {
    const { user, cookies } = req
    
    //create token
    const token = createToken(user._id)

    if (req.user) {
    res.status(400).json({
            success: true,
            message: "successful",
            user,
            token,
            cookies
        })
    }
}


//@desc User login failed (using passport.js)
//@route GET /login/failed
//@access Public
const loginFailed = async(req, res) => {
    res.status(400).json({
        success: false,
        message: "failure"
    })
}



module.exports = {
    signupUser,
    loginUser,
    forgotPassword,
    getResetPassword,
    resetPassword,
    loginSuccess,
    loginFailed
}
