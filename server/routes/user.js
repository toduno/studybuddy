const express = require('express')
const router = express.Router()

const {
    getUsers,
    getUserById,
    updateUser,
    deleteUser
} = require('../controllers/user')
//const upload = require('../middleware/upload')
const requireAuth = require('../middleware/requireAuth')

//REQUIRE AUTH FOR ALL STUDY RECORD ROUTES 
router.use(requireAuth) //fire this middleware function (i.e function that authenticates the user)
//before all of the ones below(i.e routes) because we want to protect all of these below so if a user
//wants to perform any crud operation they have to be authenticated first and this middleware will
//ensure that else if not authenticated inside the middleware function, we send back an error and it 
//(i.e user) never actually gets to these controller functions. And if authenticated, we attach the user 
//to the req object and call next() and that'll fire the appropriate function in the routes below because 
//the user is now authenticated

router.get('/', getUsers)
router.get('/:id', getUserById)
router.put('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)

module.exports = router