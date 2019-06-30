/*
  _id
  title
  description
  tags:[]
  username:
  date
*/

const mongoose = require('mongoose');

const Thread = new mongoose.Schema({
  title:String,
  description:String,
  tags:[String],
  username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  date:Date
});

Thread.methods.createThread = (reqBody) =>{
  this.title = reqBody.title;
  this.description = reqBody.description
  this.tags = reqBody.tags;
  this.date = new Date();
  this.username = reqBody.userId;
  return this;
}
module.exports = mongoose.model('Thread',Thread);
