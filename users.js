'use strict';

const mongoose =  require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const MONGODB_URI='mongodb://localhost:27017/lab14';

let SECRET = 'two-factor authentication';

mongoose.connect(MONGODB_URI);


const Users = mongoose.Schema({'userName': 'ghaid','pass': 'ghaidspassword'});

async function hash(record){
  let newRecord = new Users(record);
  newRecord.pass= await bcrypt.hash(record.pass,5);
  mongoose[record.userName]= record;
  console.log('//////',newRecord.pass);
  return record;

}
// if (!mongoose[record.userName]){
//     record.pass= await bcrypt.hash(record.pass,5)

//     mongoose[record.userName]= record;
//     return record;
// console.log(newRecord.pass);
// return Promise.reject();

// }


Users.pre('save', hash());

Users.authentication= async function(username, password){
  let comparedPass = await bcrypt.compare(password, mongoose[username].pass);
  return comparedPass ? mongoose[username] : Promise.reject();
 
};

Users.twoFactorAuthentication = async function(username){
  let uniqueToken = jwt.sign({username: username.userName}, SECRET);
  return uniqueToken;
};
Users.list = ()=> mongoose;

module.exports = Users;
