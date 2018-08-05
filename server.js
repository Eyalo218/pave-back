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



app.use(express.static('dist'));
// app.send('hello')

const addTripRoutes = require('./routes/tripRoutes')
addTripRoutes(app)

const addUserRoutes = require('./routes/userRoutes')
addUserRoutes(app)

const addReviewRoutes = require('./routes/reviewRoutes')
addReviewRoutes(app)

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`listening to requests on port  ${port}`)
} )


