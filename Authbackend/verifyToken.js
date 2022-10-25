const jwt = require('jsonwebtoken');
const secretKey = "djsakjd#@sdjkjsdalkj3@343ukss"

const verifyToken = (req,res,next) => {
    const token = req.headers['authorization']
    console.log('token is ', token)

    if(!token) {
        res.status(403).send("A token is required for authentication")
    } else {
        try {
           const decodedToken = jwt.verify(token, secretKey)
           req.decodedToken = decodedToken
           console.log("decodedToken : ", req.decodedToken)
        } catch {
            res.json({status : "error", data : 'something went wrong wrong'})
        } 
    }
    return next();
};

module.exports = verifyToken;