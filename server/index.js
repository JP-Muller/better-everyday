require('dotenv').config({ path: __dirname + '/../.env' })
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const cors = require('cors')
const uc = require('./controllers/userController')
const qc = require('./controllers/quoteController')
const initSession = require('./middleware/initSession');
const authCheck = require('./middleware/authCheck');
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env

const app = express()
app.use(cors())
app.use(express.json())

app.use(session({
    secret: SESSION_SECRET,
    saveUninitialized: true,
    resave: false
}))

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('Pulled Data!')
})

app.use(initSession)

app.post('/api/login', uc.login)
app.post('api/signup', uc.signup)
app.get('/api/user', authCheck, uc.getUser)
app.delete('/api/logout', uc.logout)

// Quotes
app.get('/api/quotes', qc.grabQuotes)


app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`))