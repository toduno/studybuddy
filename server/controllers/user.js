const User = require('../models/user')
const bcrypt = require('bcrypt')
const validator = require('validator')


const getUsers = async(req, res) => {
    try{ 
        const users = await User.find().sort({ createdAt: -1 })
        res.status(200).json(users)
    } catch(err) {
        res.status(400).json('Error: ' + err)
    }
}


const getUserById = async(req, res) => { 
    try{
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch(err) {
        res.status(400).json('Error: ' + err)
    }
}


const updateUser = async(req, res) => {
    let { firstName, lastName, username, email, password } = req.body
    console.log(req.body)
    
    //hash the password while updating
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    try{
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

        //check if user exists and update
        const body = {
            ...req.body,
            password: hash
        }

        const updateUser = await User.findByIdAndUpdate({_id: req.params.id}, body, {new: true})
        
        res.status(201).json(updateUser)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}


const deleteUser = async(req, res) => {
    try{
        const deleteUser = await User.findByIdAndDelete(req.params.id)
        res.status(200).json(deleteUser)
    } catch(err) {
        res.status(400).json('Error: ' + err)
    }
}


module.exports = {
    getUsers,
    getUserById,
    updateUser,
    deleteUser
}