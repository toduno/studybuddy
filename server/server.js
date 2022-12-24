require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const coookieSession = require("cookie-session"
)
const cors = require('cors')
const cookieSession = require('cookie-session')
const passport = require('passport')
const passportSetup = require("./passport")

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
}
const port = process.env.PORT || 7001

//express app
const app = express()


//middleware
app.use(cookieSession(
    {
        name: "session",
        keys: ["anyword"],
        maxAge: 24 * 60 * 60 * 100
    }
))
app.use(passport.initialize())
app.use(passport.session())

app.use(cors(corsOptions))
app.use(express.json())

app.use('/record', require('./routes/record.js'))
app.use(require('./routes/auth.js'))
app.use('/u', require('./routes/user.js'))
app.use('/uploads', express.static('uploads'))


app.listen(port, () => {
    //perform a database connection when server starts
    const url = 'mongodb://localhost:27017/StudyBuddyDB'
    mongoose.connect(url, {useNewUrlParser: true})
    const con = mongoose.connection

    con.on('open', () => {
        console.log('Database connected...')
    })

    console.log(`Server is running on port: ${port}`)
})