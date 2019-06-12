let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');
let crypto = require('crypto');
let userModel = require('../persistence/models/user');
let auth = require("../others/auth");

//REST API
router.post('/user/login', userLoginRouter);

SALT = "salt9900";

class REQ_USER{
  constructor(req, userm){
    this.userId = req.body.userId;
    if(userm == null){//not registed
      this.exist = false;
    }else{
      this.exist = true;
      this.token_version = userm.token_version;
      this.username = userm.user_name;
      this.password = userm.password;
    }
  }

  checkPasswd(passwd){
    if(this.exist){
      if(passwd != this.password){ 
        let err = new Error("user wrong password");
        err.code = 401;
        throw err;
      }
    }else{
      let err = new Error("user is not exist");
      err.code = 401;
      throw err;
    }
  }

  checkExist(){
    if(!this.exist){
      let err = new Error("user not exist");
      errRes.code = 404;
      throw err;
    }
  }
}
function checkInput(req, body_fields, header_fields){
  if(body_fields != undefined){
      for(field of body_fields) {
          if(field in req.body){
             continue; 
          }else{
              throw  new Error();
          }
      }
  }
  if(header_fields == undefined){
      return ;
  }
  for(header of header_fields){
      if(header in req.headers){
          continue; 
       }else{
          throw  new Error();
       }
  }
}



function ResponseError(res, errRes){
  res.shouldKeepAlive = false;
  let code = 500;
  if(errRes.code != undefined){
    code = errRes.code;
  }
  res.status(code);  
  let response_json = {
    code:code,
    message:errRes.message
  }
  res.json(response_json);
  res.end();
}

function ResponseUserLoginOK(res, token){
  let response_json = {
    code: 0,
    "token": token
  };
  res.json(response_json);
  res.shouldKeepAlive = false;
  res.status(200);
  res.end();
}

function generateToken(secret, userId, version){
    let token = jwt.sign({
      user: userId,
      token_version: version.toString()
  }, secret, { expiresIn: 60 * 60 * 24 * 15 });
  return token;
}


async function  userLoginRouter(req, res){
  console.log("login:",req.body);
  try{
    let body_fields = ["password","userId"];
    checkInput(req, body_fields);
    let userm = await userModel.findOne({ where: {user_id:req.body.userId} });
    let user = new REQ_USER(req,userm);
    user.checkExist();
    user.checkPasswd(req.body.password);
    let userTokenVersion = Date.now();
    auth.saveTokenVersion(userTokenVersion,userm);
    let tokenPayload = auth.createTokenPayload(user.userId,userTokenVersion);
    let secret = await auth.createSecret(tokenPayload, SALT);
    let token = generateToken(secret, user.userId, userTokenVersion);
    ResponseUserLoginOK(res, token);
    return;
  }catch(err){
    console.log(err.message);
    ResponseError(res, err);
  }

}

function userLogout(req, res){

}



module.exports = router;