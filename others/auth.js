let crypto = require('crypto');
let jwt = require('jsonwebtoken');
const db = require('../persistence/db');
let userModel = require('../persistence/models/user');
const check = require('../others/chack_fields');
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
    return payload = {
      user_id : userId,
      exp : Math.floor(Date.now() / 1000) + (60 * 60),//1 hour
      token_version : version.toString() 
    }
   
}

authorization.saveTokenVersion = (version, userm) => {
    userm.update({ token_version: version});
  }

authorization.createToken = (secret,payload) => {
    let token = jwt.sign(payload, secret);
    return token;
}
  authorization.isAuthorized = async (req) => {
    if(req.headers.authorization == undefined){
            err = new Error;
            err.message = "unauthorized";
            err.code = 401;
            throw err;
    }
    let token = req.headers.authorization.split(' ')[1];
    let payload1 = await jwt.decode(token);
    let attributes = ["user_id"];
    check.checkAttributesOfObj(payload1,attributes);
    let payload = await authorization.createTokenPayload(payload1.user_id,payload1.token_version);
    let secret = await authorization.createSecret(payload.toString(), SALT);
    try{
        let result = await userModel.findByPk(payload.user_id.toString());
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