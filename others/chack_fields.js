function checkAttributesOfObj(obj, attributes){
    if(attributes != undefined){
        for(field of attributes) {
            if(field in obj){
               continue; 
            }else{
                throw  new Error(`${field.toString()} is not attribute of ${obj} `);
            }
        }
    }else{
        throw  new Error(` ${obj.toString()} is undefined`);
    }
}

function checkRequestFields(req, body_fields, header_fields){
    if(body_fields != undefined){
        for(field of body_fields) {
            if(field in req.body){
               continue; 
            }else{
              let err =   new Error(`request body miss fields: ${field} `);
              err.code = 400;
              throw err;
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
          let err =   new Error(`request headers miss fields: ${header}`);
          err.code = 400;
          throw err;
         }
    }
  }

  module.exports = {
    checkAttributesOfObj,
    checkRequestFields
  }