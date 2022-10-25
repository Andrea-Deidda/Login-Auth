const express = require ('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authModelSchema = require('../models/authModel');
const { exists } = require('../models/authModel');
const secretKey = "djsakjd#@sdjkjsdalkj3@343ukss"
const verifyToken = require('../verifyToken');

router.post('/login', async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    await authModelSchema.findOne({email : email}).then(existUser => {
        if(existUser && existUser._id){
            bcrypt.compare(password , existUser.password , function(err, response){
                if(!err){
                    if(response){
                        const authToken = jwt.sign({_id : existUser._id, email : existUser.email} , secretKey, {
                        expiresIn : '1h'
                        })
                        res.json({status:'ok' , data: {authToken, response, existUser}})
                    } else {
                        res.json({status:'error', data : {existUser, response, error : 'password errata'}})
                    }
                }
            })
        } else {res.json({status:'error', data : {existUser, response}})}
    }).catch(err => {
        res.json({status:'error', data : 'username non trovato'})
    })
})

router.get('/dashboard', verifyToken, async (req, res) =>{

    console.log("req " , req.decodedToken)
    // if(req && req.decodedToken){ 
    //    res.json({status : 'ok', data : 'ok'}) 
    // } else {
    //     res.json({status : 'error', data : 'error'})
    // }
    // console.log("welcome dashboard")
})

router.post('/register', async(req, res) => {
    const registerUserData = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        gender: req.body.gender,
        dob: req.body.dob
    }
    const salt = await bcrypt.genSalt(10)
    await bcrypt.hash(req.body.password, salt).then(hashedPassword => {
        if(hashedPassword) {
            console.log('hashed password', hashedPassword)
            registerUserData.password = hashedPassword
        }
    })
    await authModelSchema.create(registerUserData).then(userStoredData => {
        if(userStoredData && userStoredData._id) {
            console.log('user stored data', userStoredData)
            res.json({status:'ok', data : userStoredData})
        }
    }).catch(err => {
        if(err) {
            res.json({status:'error', data : err})
        }
    })
})

module.exports = router