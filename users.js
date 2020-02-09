'use strict';

const mongoose =  require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const MONGODB_URI='mongodb://localhost:27017/lab14';

let SECRET = 'two-factor authentication';
let roles = {
  user:['read'],
  editor:['read', 'create','update'],
  admin:['read','create','update','delete'],
};
mongoose.connect(MONGODB_URI);
//({'userName': 'ghaid','pass': 'ghaidspassword'})
// ({'userName': 'ghaid','pass': 'ghaidspassword'});
const Users = mongoose.Schema({
  userName: {type:String},
  pass: {type:String},
});

Users.pre('save', async function(record){
  let newRecord = new Users( {});
  newRecord.pass= await bcrypt.hash(record.pass,5);
  mongoose[record.userName]= record;
  console.log('//////',newRecord.pass);
  return record;

});
// if (!mongoose[record.userName]){
//     record.pass= await bcrypt.hash(record.pass,5)

//     mongoose[record.userName]= record;
//     return record;
// console.log(newRecord.pass);
// return Promise.reject();

// }





Users.authentication= async function(username, password){
  let comparedPass = await bcrypt.compare(password, mongoose[username].pass);
  return comparedPass ? mongoose[username] : Promise.reject();
 
};

Users.twoFactorAuthentication = async function(username){
  let info={
    username: username.userName,
    userCap: roles[username.roles],
  };

  let uniqueToken = jwt.sign(info, SECRET);
  return uniqueToken;
};
Users.list = ()=> mongoose;

module.exports = new Users;
