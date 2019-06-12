let crypto = require('crypto');
let jwt = require('jsonwebtoken');
const db = require('../persistence/db');
let userModel = require('../persistence/models/user');

SALT = "salt9900";
let authorization = new Object();


authorization.createSecret =  async (payload, salt) =>{
    return new Promise((resolve,reject) =>{
        let hash = crypto.pbkdf2(payload, salt, 4096, 128,'sha256',(err, hash) => {
            if (err) { reject(null) }
            resolve( hash.toString('hex'));
        })
    })
}
authorization.createTokenPayload = (userId,version) => {
    let payload = {
      "userId" : userId,
      exp : 1,
      token_version : version.toString() 
    }
    return JSON.stringify(payload);
}

authorization.saveTokenVersion = (version, userm) => {
    userm.update({ token_version: version});
  }


  authorization.isAuthorized = async (req) => {
    if(req.headers.authorization == undefined){
            err = new Error;
            err.message = "unauthorized";
            err.code = 401;
            throw err;
    }
    let token = req.headers.authorization.split(' ')[1];
    let payload = await jwt.decode(token);
    let payloadString = await authorization.createTokenPayload(payload.user,payload.token_version);
    console.log(payloadString);
    let secret = await authorization.createSecret(payloadString, SALT);
    console.log("secret : "+secret);
    try{
        let result = await userModel.findByPk(payload.user.toString());
        let decoded = jwt.verify(token, secret);//token valid
        if(decoded.token_version != result.token_version){// Not expired
            err = new Error;
            err.message = "unauthorized";
            err.code = 401;
            throw err;
        }else{
            return true;
        }
    }catch(err){
        err.code = 401;
        throw err;
    }
}
module.exports = authorization;