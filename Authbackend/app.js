const express = require('express')
const app = express()
const mongoose = require('mongoose')
const mongoURI = "mongodb://localhost/loginData"
const authRouter = require('./routes/auth')
const bugRouter = require('./routes/bug')
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use('/auth', authRouter)
app.use('/bug', bugRouter)

mongoose.connect(mongoURI)
mongoose.connection.on('open', () => {
    console.log('database connected successfully')
})

app.listen(3000, (err) => {
    if(!err){
        console.log("Listening on port 3000")
    }
})
