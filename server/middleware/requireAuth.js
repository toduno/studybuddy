//Create a middleware function that fires for every single study record routes before the controller functions 
//which will check that the user making the request is authenticated. To do that it needs to check if the request
//came loaded with the jwt for that user, and if it did it's valid and not tampered with. If both criteria are
//passed then we can allow access to the user to the study record results else we prevent access and send back an
//error response


const jwt = require('jsonwebtoken')
const User = require('../models/user')


const requireAuth = async (req, res, next) => {

    //VERIFY AUTHENTICATION

    //a. grab one of the headers property i.e authorization from the headers (which should contain the jwt),
    //so when sending requests here (having the authorization property) it'll be for the token
    //in the headers under authorization property
    const { authorization } = req.headers //first make sure we have the authorization property exists or set in
    //the headers when making or sending requests in the frontend (i.e the crud api) before we can access it
    //else an error message
    if (!authorization) {
        return res.status(401).json({error: 'Authorization token required'})
    }

    //b. get the token from the string in the authorization property (excluding Bearer)
    const token = authorization.split(' ')[1] //the token is in index 1

    //c. verify the token (with that in the .env) to make sure it hasn't been tampered with (for the user to be authorized)
    try {
        const {_id} = jwt.verify(token, process.env.secret) //grab the _id from the verified token (i.e the payload)

        req.user = await User.findById({_id}) //use the _id from the payload to try and find this user (with the _id) 
        //in the database and assign to req.user.
        //Note that user in req.user is a random name and can be any name since we're just attaching to the request
        //object so that when we go on to the next piece of middleware (e.g one of the records controller functions), 
        //on the request object in those functions we're going to have this user property (with the id) now there because we're attaching 
        //it in this function which runs first. So now the user present there is authorized and can safely make crud operations
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }

}


module.exports = requireAuth
