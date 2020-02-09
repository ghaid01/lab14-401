'use strict';

const users = require('./users.js');

module.exports = (capabilities) => {
  return (req,res,next) => {
    try {
      if(req.user.capability.includes(capabilities)){
        next();
      } else{
        next('can not access');

      }
    }catch(err){
      next('can not log in');
    }
  };
};
