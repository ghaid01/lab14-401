'use strict';

const server = require("./lib/server.js");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const options = {
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology:true
}

mongoose.connect(process.env.MONGODB_URI, options);

server.start(process.env.PORT);