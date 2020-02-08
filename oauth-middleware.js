'use strict';

const superagent = require('superagent');
const users = require('./users.js');

const tokenServer = 'https://github.com/login/ouath/access_token';
const remoteApi = 'https://api.github.com/user';
const API_SERVER = 'https://localhost:3000/oauth';

module.exports = async function authorize(rq,res,next){
try{
    let code = req.query.code;

    let remoteToken = exchangeCodeForToken(code);
    console.log(code);
    console.log(remoteToken);

    let remoteUser
}
};

async function exchangeCode(code){
  let response = await (await superagent.post(tokenServer)).setEncoding({
    code: code,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirecr_uri: API_SERVER,
    grant_type: 'authorization_code',
  });
  let access_token = response.body.access_token;
  return access_token;
}
async function getUserInfo(token){
  let userRespone = await superagent.get(remoteApi)
    .set('user-agent','express-app')
    .set('authorization', `token${token}`);

  let user = userRespone.body; // an object with a username and password
  return user;
}

async function getUser(remoteUser){
  let userRecord={
    username:remoteUser.login,
    password:'anypassword',
  };
  let user = await users.save(userRecord);
  let token = users.generateToken(user);
  return [user,token];
}



