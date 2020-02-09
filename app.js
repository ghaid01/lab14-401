'use strict';


const express = require('express');
const auth = require('./basic-auth-middleware.js');
const users = require('./users.js');
const oauth = require('./oauth-middleware.js');
const bearerAuth = require('./bearerAuth.js');
const acl = require('./acl-middleware.js');

const app = express();
app.use(express.json());
app.use(express.static('./index.js'));

app.post('/signup', (req,res) => {
  users.save(req.body)
    .then(user => {
      let token = users.generateToken(user);
      res.status(200).send(token);


    });
});

app.post('/signIn page', auth,(req,res)=>{
  res.status(200).send(req.token);
});

app.get('/users', auth, (req,res) =>{
  res.status(200).json(users.list());
});

app.get('/oauth', oauth, (req,res)=> { // run it through outh middleware and this is gonna do the hand shake 
  res.status(200).send(req.token);
});

app.get('/user', bearerAuth, (req, res) =>{
  res.status.send(200).json(req.user);
});
app.get('/create', bearerAuth, acl('create'), (req,res)=>{
  res.status(200).send('authorized');
});

app.get('/update', bearerAuth, acl('update'), (req,res)=>{
  res.status(200).send('authorized');
});

app.get('/delete', bearerAuth, acl('delete'), (req,res) => {
  res.status(200).send('authorized');
});

app.listen(3000,() =>console.log('server is up'));