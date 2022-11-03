const express = require ('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authModelSchema = require('../models/authModel');
const { exists } = require('../models/authModel');
const secretKey = "djsakjd#@sdjkjsdalkj3@343ukss"
const verifyToken = require('../verifyToken');
const {json} = require("express");




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



router.get('/getUser/:email', verifyToken, async (req, res) =>{
    try{
        const user = await authModelSchema.findOne({'email' : req.params.email});
        //console.log(req);
        res.json(user);
    }catch(err){
        res.json({message: err});
    }
})


router.patch('/updateUser/:email', async (req, res) => {

    try{
        const updateUser = await authModelSchema.updateOne(

            {email: req.params.email },
            {$set: { username: req.body.username,
                            email: req.body.email,
                            dob: req.body.dob} }
        );
        console.log(updateUser , req.body)
        res.json({status:'ok', message : 'utente aggiornato con successo'})
    }catch (err){
        res.json({message: 'err'})
    }

})


router.post('/register', async(req, res) => {

    const checkUserEmail = await authModelSchema.findOne({'email': req.body.email})
    const checkUserUsername = await authModelSchema.findOne({'username': req.body.username})

    if (checkUserEmail != null) {
        console.log('email già esistente ', checkUserEmail.email)
        res.json({status:'error', data : 'email già presente'})
    } else {
        if (checkUserUsername != null){
        console.log('username gia presente ', checkUserUsername.username)
            res.json({status:'error', data : 'username già presente'})
    } else {
        console.log('email e username corrette')
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
    }
    }

})

module.exports = router