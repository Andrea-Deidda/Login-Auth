const express = require ('express')
const router = express.Router();

const bugModelSchema = require('../models/bugModel')


router.post('/addbug', async(req, res) => {
    const registerBugData = {
        title: req.body.title,
        description: req.body.description,
        severity : req.body.severity,
        dob: req.body.dob,
        username : req.body.username
    }
    await bugModelSchema.create(registerBugData).then(bugStoredData => {
        if(bugStoredData && bugStoredData._id) {
            console.log('bugs stored data', bugStoredData)
            res.json({staus:'ok', data : bugStoredData})
        }
    }).catch(err => {
        if(err) {
            res.json({staus:'error', data : err})
        }
    })
})

module.exports = router