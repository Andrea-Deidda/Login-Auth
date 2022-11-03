const jwt = require('jsonwebtoken');
const {decode} = require("jsonwebtoken");
const secretKey = "djsakjd#@sdjkjsdalkj3@343ukss"

const verifyToken = (req,res,next) => {
    const token = req.headers.authorization.split(' ')[1]
    console.log('token is ', token)

    if(!token) {
        res.status(403).send("A token is required for authentication")
    } else {
/*        try {
           const decodedToken = jwt.verify(token, secretKey)
           req.decodedToken = decodedToken
           //console.log("decodedToken : ", req.decodedToken)
        } catch {
            res.json({status : "error", data : 'invalid token'})
        } */

        jwt.verify(token, secretKey, (err, decodedToken) => {
            if(!err) {
                req.decodedToken = decodedToken
            } else if (err){
                res.status(403).send(err)
            }
        })
    }
    return next();
};

module.exports = verifyToken;