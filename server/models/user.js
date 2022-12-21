const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')


const userSchema = new mongoose.Schema({
    // photo: {
    //     type: String
    // },
    firstName: {
        type: String,
        required:[true, 'Please add a first name']
    },
    lastName: {
        type: String,
        required:[true, 'Please add a last name']
    },
    username: {
        type: String,
        required: [true, 'Please add a username'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    photo: {
        type: String,
        required: true
    },
    
}, {timestamps: true}
)


//STATIC METHOD - using Mongoose static function (e.g UserModel.signup()) to register or login user

// //Static signup method
// userSchema.statics.signup = async function(firstName, lastName, username, email, password, photo) {

//     //validation
//     if (!firstName || !lastName || !username || !email || !password) {
//         throw Error('All fields must be filled!')
//     }
//     if (!validator.matches(firstName || lastName, '^[a-zA-Z_.-]*$')) {
//         throw Error('Invalid name')
//     }
//     if (!validator.matches(username, '^[a-zA-Z0-9_.-]*$')) {
//         throw Error('Invalid username')
//     }
//     if (!validator.isEmail(email)) {
//         throw Error('Invalid email address')
//     }
//     if (!validator.isStrongPassword(password)) {
//         throw Error('Weak password') 
//     }

//     //check if user's email or username exists and hash password
//     const emailExists = await this.findOne({ email }) //'this' refers to 'User' model
//     const usernameExists = await this.findOne({ username })

//     if (emailExists || usernameExists) {
//         throw Error('Email or username already in use!')
//     }

//     const salt = await bcrypt.genSalt(10)   
//     const hash = await bcrypt.hash(password, salt)

//     const user = await this.create({
//         firstName,
//         lastName,
//         username,
//         email,
//         password: hash,
//         photo
//     })
//     // if(req.file) {
//     //     user.photo = req.file.filename
//     // }

//     return user
// }


//Static login method
userSchema.statics.login = async function(email, password) {
    
    //validation
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    //check if user exists and compare password with that in the database
    const user = await this.findOne({ email })

    if (!user) {
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect password')
    }

    return user

}


//Static forgot password method
userSchema.statics.forgotPassword = async function(email) {
    
    //validation
    if (!email) {
        throw Error('Email field must be filled')
    }

    //check if user exists 
    const user = await this.findOne({ email })

    if (!user) {
        throw Error('Incorrect email')
    }

    return user

}


// //Static reset password method
// userSchema.statics.resetPassword = async function(id, password) {
    
//     //validation
//     if (!password) {
//         throw Error('Password field must be filled')
//     }

//     const salt = await bcrypt.genSalt(10)   
//     const hash = await bcrypt.hash(password, salt)

//     //check if user exists 
//     const user = await this.findByIdAndUpdate({ 
//         id,
//         password: hash 
//     })

//     if (!user) {
//         throw Error('Invalid link or expired!')
//     }

//     return user

// }
/////////// END


module.exports  = mongoose.model('User', userSchema)
