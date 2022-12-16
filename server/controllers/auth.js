const User = require('../models/user')
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

//         const id = user._id //or const {_id} = user  //gets this from the user database (using the .login() user variable we used
//         //when getting user details from the db or the user here) to send back too to the client

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
            password,
        })
        if(req.file) {
            user.photo = req.file.filename
        }

        try{
            const saveNewUser = await user.save()
            const token = createToken(user._id)

            const {_id, username, photo} = user  //gets this from the user database (using the .login() user variable we used
            //when getting user details from the db or the user here) to send back too to the client

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
