const User = require('../models/user')
const sendEmail = require('../utils/sendEmail')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


//reusable function that signs the token for the user signup and login
const createToken = (_id) => {
   return jwt.sign({_id}, process.env.SECRET, {  expiresIn: '10d' })
}


// //@desc Register a user
// //@route POST /signup
// //@access Public
// const signupUser = async(req, res) => {
//     const { firstName, lastName, username, email, password } = req.body
//     const { photo } = req.file.filename

//     try {
//         const user = await User.signup(firstName, lastName, username, email, password, photo) //executig the .signup()
//         //function we created in the model schema. Note we're passing the result of the function to this
//         //user variable 

//         //create token
//         const token = createToken(user._id)

//         const id = user._id //or const {_id} = user  //gets all thes from the user database (using the .login() static method user variable 
            //used when getting user details from the db or the user here) to also send back to the client

//         res.status(200).json({email, token, id}) //sends the email of the user created, and the token 
//         //to the browser
//     } catch (error) {
//         res.status(400).json({error: error.message})
//     }
// } 

const signupUser =  async(req, res) => {
    let { firstName, lastName, username, email, password } = req.body

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

        try{
            const saveNewUser = await user.save()
            const token = createToken(user._id)

            const {_id, username, photo} = user  //gets all thes from the user database (using the .login() static method user variable 
            //used when getting user details from the db or the user here) to also send back to the client

            res.status(200).json({email, token, _id, username, photo}) 

        } catch(err) {
            res.status(400).json('Error: ' + err)
        }
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

    const { _id, username, photo } = user
    
    res.status(200).json({email, token, _id, username, photo})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


//@desc Authenticate a user
//@route POST /forgotPassword
//@access Public 
const forgotPassword = async(req, res) => {
    const { email } = req.body
 
    try {
     const user = await User.forgotPassword(email) //executes the .forgotPassword() mongoose static method 
     const { _id } = user

     //create token
     const token = createToken(_id) //token will be used to authenticate the user when resetting the password

     const link = `http://localhost:7001/resetPassword/${_id}/${token}`
     await sendEmail(email, 'Password Reset', link)
     console.log(link)

     res.status(200).json('Password reset link has been sent to your account!')

     } catch (error) {
         res.status(400).json({error: error.message})
         console.log(error)
     }
 }


//@desc Authenticate a user
//@route GET /resetPassword
//@access Public
 const getResetPassword = async(req, res) => { 
    const {id, token} = req.params
    console.log(req.params)
    
    const user = await User.findById(req.params.id)
    if (!user) {
        throw Error('User does not exist!')
    }

    try {
        if (token === process.env.SECRET ) res.status(200).send('Verified!')
    } catch (error) {
        res.status(400).send('Not verified!')
    }

    res.status(200).json('Done!')
}


//@desc Authenticate a user
//@route PATCH /resetPassword
//@access Public
const resetPassword = async(req, res) => {
    console.log(req.body)

     //hash the password while updating
    const { password } = req.body
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    try{
        const body = {
            ...req.body,
            password: hash
        }
        const token = req.params

        if (!token) return res.status(400).send('Invalid or expired link!')

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


module.exports = {
    signupUser,
    loginUser,
    forgotPassword,
    getResetPassword,
    resetPassword
}
