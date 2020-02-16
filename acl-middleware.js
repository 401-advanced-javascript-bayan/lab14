/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */

const users = require('./users.js');
let aclMiddleware = function(ability){
  return (req,res,next)=>{
    try {
      //to ckeck req.user.capabilites
      //includes is array method return true or false
      console.log('aaaa',req.user.role)
      if(users.checkForcapability(ability,req.user.role)){
        next();
      }else{
        next('access denied');
      }
    }catch(err){
      next('cannot login');
    }
  };
};
module.exports = aclMiddleware;