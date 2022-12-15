const User = require('../models/user')
const jwt = require('jsonwebtoken')


//reusable function that signs the token for the user signup and login
const createToken = (_id) => {
   return jwt.sign({_id}, process.env.SECRET, {  expiresIn: '7d' })
}


//@desc Register a user
//@route POST /signup
//@access Public
const signupUser = async(req, res) => {
    const { firstName, lastName, username, email, password, photo } = req.body

    try {
        const user = await User.signup(firstName, lastName, username, email, password, photo) //executig the .signup()
        //function we created in the model schema. Note we're passing the result of the function to this
        //user variable 

        //create token
        const token = createToken(user._id)

        const id = user._id //or const {_id} = user  //gets this from the user database (using the .login() user variable we used
        //when getting user details from the db or the user here) to send back too to the client

        res.status(200).json({email, token, id}) //sends the email of the user created, and the token 
        //to the browser
    } catch (error) {
        res.status(400).json({error: error.message})
    }
} 


//@desc Authenticate a user
//@route POST /login
//@access Public 
const loginUser = async(req, res) => {
   const { email, password } = req.body

   try {
    const user = await User.login(email, password) //executing the .login()
    //function we created in the model schema 

    //create token
    const token = createToken(user._id)

    const {_id, username, photo} = user
    
    res.status(200).json({email, token, _id, username, photo})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


module.exports = {
    signupUser,
    loginUser
}
