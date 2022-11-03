const express = require ('express')
const router = express.Router();

const bugModelSchema = require('../models/bugModel')


router.post('/addbug', async(req, res) => {

    const count = await bugModelSchema.countDocuments() +1

    console.log('Numero doc', count)
    const registerBugData = {
        progressiveNumber : count,
        title: req.body.title,
        description: req.body.description,
        severity : req.body.severity,
        dob: req.body.dob,
        username : req.body.username,
        status : req.body.status
    }
    await bugModelSchema.create(registerBugData).then(bugStoredData => {
        if(bugStoredData && bugStoredData._id) {
            //console.log('bugs stored data', bugStoredData)
            res.json({staus:'ok', data : bugStoredData})
        }
    }).catch(err => {
        if(err) {
            res.json({staus:'error', data : err})
        }
    })
})

router.get('/getAllBug', async (req, res) =>{
    try{
        const allBug  = await bugModelSchema.find();
        res.json(allBug)
    }catch (err){
        res.json({message : err})
    }
})

module.exports = router