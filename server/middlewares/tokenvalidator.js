/*
    Middleware to validate the each request
*/
const jwt = require('jsonwebtoken');
const config = require('../configs/config');

module.exports = ( req,res,next) =>{
    // get the token from the request
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(token){
        // verify the secret and checks exp;
        jwt.verify(token,config.secret , (err,decoded) =>{
            if(err){
                return res.json({"Error":true,"message":"Failed To authenticate token"});
            }
            console.log(decoded)
            req.decoded = decoded;
            req.body.userId = Object.keys(decoded)[0];
            next();
        });
    }else{
        return res.status(403).send({
            "Error":true,
            "message":"No Token Provided"
        })
    }
}
