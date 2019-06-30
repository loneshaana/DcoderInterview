/**
 * API'S for creating and return the list of threads 
 * created by a particular user
 */
const express = require('express');
const router = express.Router();
const passport = require('passport');
const config = require('../configs/config');
const jwt = require('jsonwebtoken');
const repository = require('../repository/repository');
router.get("/authping",(req,res,next) =>{
  res.json({"auth":true});
});

router
  .post('/create/thread' , (req,res,next) =>{
    // validate the data
    repository.createThread(req.body)
    .then(result =>res.json(result))
    .catch(error =>res.status(403).json(error));
  });

router
  .get('/list/thread' , (req,res,next) =>{
    const {userId} = req.query;
    repository.listThread(userId)
      .then(result =>res.json(result))
      .catch(error =>res.status(403).json(error));
  })

module.exports = router;
