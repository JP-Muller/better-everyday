require('dotenv').config({ path: __dirname + '/../.env' })
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const cors = require('cors')
const uc = require('./controllers/userController')
const lc = require('./controllers/listController')
const qc = require('./controllers/quoteController')
const initSession = require('./middleware/initSession');
const authCheck = require('./middleware/authCheck');
const path = require('path')
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env

const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(session({
    secret: SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 }
}))

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('Pulled Data!')
})

app.use(initSession)

app.get('/api/entries', lc.dailyEntries)
app.post('/api/entries', lc.addItem)
app.put('/api/entries/:id', lc.updateItem)
app.delete('/api/entries/:id', lc.deleteEntry)

//db data eps
app.get('/api/posts/:userId', lc.getPosts)
app.delete('/api/posts/:postId', lc.deletePost)
app.put('/api/posts/edit/:postId', lc.editPost)
app.put('/api/editImage/:postId', lc.editPostImage)
app.put('/api/editEntry/:postId', lc.editPostEntry)
app.post('/api/posts', lc.savePost)
app.get('/api/getallpublic', lc.getAllPublic)

//nodemailer
app.post('/api/form', (req, res) => {
    nodemailer.createTestAccount((err, account) => {
        const htmlEmail = `
        <h3>Contact Details</h3>
        <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
        `

        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'dion.dare0@ethereal.email',
                pass: 'eVH81yrFfFDmxHUdbK'
            }

        })
        let mailOptions = {
            from: 'test@testaccount.com',
            to: 'dion.dare0@ethereal.email',
            replyTo: 'test@testaccount.com',
            subject: 'New Message',
            text: req.body.message,
            html: htmlEmail
        }
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return console.log(err)
            }
            console.log('Message sent!', info.message);
            console.log('Message URL:', nodemailer.getTestMessageUrl(info));
        })
    })
})
//Authentication
app.post('/api/login', uc.login)
app.post('/api/signup', uc.signup)
app.get('/api/user', authCheck, uc.getUser)
app.delete('/api/logout', uc.logout)
app.get('/api/admingetall', uc.adminGetAllPosts)

//User Scores
app.post('/api/userscores', uc.getScores)
app.post('/api/levelup', uc.levelUp)
app.post('/api/addstreak', uc.addToStreak)
app.post('/api/removestreak', uc.removeStreak)
app.post('/api/streakblockeron', uc.streakBlockerOn)
app.post('/api/streakblockeroff', uc.streakBlockerOff)
app.put('/api/userimage', uc.updateProfileImage)


// Quotes
// app.get('/api/quotes', qc.grabQuotes)

//Background Image

//IP Location finder
// app.get('/api/location', lc.grabLocation)
//Weather

app.use(express.static(__dirname + '/../build'))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
})

app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`))