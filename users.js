'use strict';

const mongoose =  require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

mongoose.connect(process.env.MONGODB_URI);


const users = mongoose.Schema({

})


// users.pre('save', )

