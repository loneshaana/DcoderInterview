const express = require('express');
const router = express.Router();
const passport = require('passport');
const config = require('../configs/config');
const jwt = require('jsonwebtoken');
const repository = require('../repository/repository');

router.get('/ping' , (req,res,next) =>{
  res.json({"ping":true});
})

router
    .post('/login',passport.authenticate('local') , (req , res,next) =>{
        // if the function gets called then the authentication was successfull
        const {user} = req;
        // Generate the token
        const token = jwt.sign({[user._id]:user.username}, config.secret);
        const dataToSend = {
          username:user.username,
          _id:user._id,
          verified:user.verified
        }
        /*
          req.session.username = user.username;
          req.session.token = token;
        */
        res.json({"Authenticated":true,"token":token,user:dataToSend});
    });

router
  .post('/register' ,(req,res,next) =>{
    // validate the data;
    repository.register(req.body)
      .then(result =>res.json(result))
      .catch(error =>res.status(403).json(error));
  })

module.exports = router;
