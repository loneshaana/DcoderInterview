const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true
  },
  hash:String,
  salt:String
});

userSchema.methods.setPassword = function(passwd){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(passwd,this.salt,1000,64,'sha1').toString('hex');
};

userSchema.methods.validPassword = function(passwd){
  const hash = crypto.pbkdf2Sync(passwd,this.salt,1000,64,'sha1').toString('hex');
  return this.hash === hash;
}

userSchema.methods.createAdminUser = function(){
  this.username="admin";
  this.setPassword("admin");
  return this;
}

userSchema.methods.createNewUser = function(reqBody){
  this.username = reqBody.username;
  this.setPassword(reqBody.password);
  return this;
}

module.exports = mongoose.model('User',userSchema);
