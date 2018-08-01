const express = require('express')
const session = require('express-session')
var bodyParser = require('body-parser') 
var cookieParser = require('cookie-parser') 
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors({
    origin: ['http://localhost:8080'],
    credentials: true // enable set cookie
}))
app.use(session({
    secret: 'secret string',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    },
    cookieName: 'session',
}))



// app.send('hello')

const addTripRoutes = require('./routes/tripRoutes')
addTripRoutes(app)

const addUserRoutes = require('./routes/userRoutes')
addUserRoutes(app)

const addReviewRoutes = require('./routes/reviewRoutes')
addReviewRoutes(app)


app.listen(3000,()=>{
    console.log('listening to requests on port 3000!')
} )


