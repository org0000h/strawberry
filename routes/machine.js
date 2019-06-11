let express = require('express');
let router = express.Router();
const db = require('../persistence/db');
let deveice_list = require('../persistence/models/deveice_list').config_infoModel(db);
let controller_infoModel = require('../persistence/models/controller_info').controller_infoModel(db);
let deveice_infoTable = require('../persistence/models/deveice_info');
hashmapFrontendtoIot = {
    cntId:"device_id",
    cntName:"device_name",
    address:"device_address",
    devId:"eqp_device_id",
    devName:"eqp_device_name",
    devType:"eqp_type_name",
    type:"type",
    status:'del_flag'
}

hashmapIotToFrontend = {
    device_id :"cntId",
    device_name : "cntName",
    device_address : "address",
    eqp_device_id : "devId",
    eqp_device_name : "devName",
    eqp_type_name : "devType",
    del_flag : "status"
}

ord = {
    "+": "ASC",
    "-": "DESC",
}
router.post("/getDevList",getDevListRouter);
router.post("/getCntList",getCntListRouter);
router.post("/setCntInfo",setCntListRouter);
router.post("/delCntInfo",delCntListRouter);
router.post("/getDevList",getDevListRouter);
router.post("/getNewData",getNewDataRouter);

async function getNewDataRouter(req, res){
    try{
        let QueryCondition = generateNewDataQueryCondition(req);
        let device_model = deveice_infoTable.deviceModel(db,QueryCondition.eqp_type_name);
        let device_infos = await device_model.findAll({
            where:QueryCondition.whereCondition,
            // attributes: [hashmapFrontendtoIot.cntId,
            //             hashmapFrontendtoIot.devId,
            //             hashmapFrontendtoIot.devType],
            // order: [[hashmapFrontendtoIot[sort], ord[req.body.sort[0]]]]
        });
        let data = [];
        let headers = [];
        for(i in device_infos[0].data){
            headers.push(i);
            data.push(device_infos[0].data[i]);
        }
        let json = {
            code: 0,
            data:data,
            headers:headers
        }
        res.json(json);
    }catch(err){
        console.log(err.message);
    }
}

async function getDevListRouter(req, res){
    let sort = req.body.sort.substr(1);   
    let whereCondition = {
        device_id:req.body.cntId.toString(),
        eqp_device_id: req.body.devId.toString()
    }
    addOptionalQuery(req, whereCondition);
    try{
        let list = await getFromModelAndGeneratList(whereCondition, sort, req);
        let json = generateRes(list); 
        normalResponse(res,json);
    }catch(err){
        console.log(err.message);
    }
}

function generateRes(list) {
    let json = {};
    json.code = 0;
    json.data = list;
    return json;
}

async function getFromModelAndGeneratList(whereCondition, sort, req) {
    let device_infos = await deveice_list.findAll({
        where: whereCondition,
        attributes: [hashmapFrontendtoIot.devId,
        hashmapFrontendtoIot.devName,
        hashmapFrontendtoIot.devType,
        hashmapFrontendtoIot.status],
        order: [[hashmapFrontendtoIot[sort], ord[req.body.sort[0]]]]
    });
    list = [];
    for (dev of device_infos) {
        item = {};
        item.devId = dev[hashmapFrontendtoIot.devId];
        item.devName = dev[hashmapFrontendtoIot.devName];
        item.devType = dev[hashmapFrontendtoIot.devType];
        item.type = dev[hashmapFrontendtoIot.type];
        item.status = dev[hashmapFrontendtoIot.status];
        list.push(item);
    }
    return list;
}

function addOptionalQuery(req, whereCondition) {
    if (req.body.devName != "" &&
        req.body.devName != undefined) {
        whereCondition[hashmapFrontendtoIot.devName] = req.body.devName;
    }
    if (req.body.devType != "" &&
        req.body.devType != undefined) {
        whereCondition[hashmapFrontendtoIot.devType] = req.body.devType;
    }
}

async function delCntListRouter(req, res){
    try{
        let result = await controller_infoModel.destroy({
            where:{
                device_id: req.body.cntId.toString()
            }
        });

        let code = 0;
        if(!result){
            code = 404;
        }
        let json = {
            "code": code
        }
        normalResponse(res, json);
    }catch(err){
        err.message = "del failed";
        err.code = 500;
        ErrResponse(res, err);
    }
}

async function setCntListRouter(req, res){
    try{
        let result = await controller_infoModel.findByPk(req.body.cntId.toString());
        result.device_name = req.body.cntName;
        result.device_address = req.body.address;
        await result.save();
        let json = {
            "code": 0,
            "message":"can't find this controller"
        }
        normalResponse(res, json);

    }catch(err){
        err.message = "can't find this controller";
        err.code = 404;
        ErrResponse(res, err);
    }

}

function normalResponse(res, json){
    res.json(json)
}
function generateNewDataQueryCondition(req){
    QueryCondition = {};
    QueryCondition.whereCondition = {};
    QueryCondition.whereCondition[hashmapFrontendtoIot.cntId] =  req.body.cntId.toString();
    QueryCondition.whereCondition[hashmapFrontendtoIot.devId] =  req.body.devId;
    QueryCondition[hashmapFrontendtoIot.devType] =  req.body.devType;
    return QueryCondition;
}

function generateQueryCondition(req){
    QueryCondition = {};
    QueryCondition.amount = req.body.limit;
    QueryCondition.offset = req.body.limit * (req.body.page - 1);
    QueryCondition.sort = req.body.sort.substr(1);
    return QueryCondition;
}
async function getControllerList(req){
    let queryCondition = generateQueryCondition(req);
    let all_controller_info = await controller_infoModel.findAndCountAll({
        attributes: ['device_id','device_name', 'device_address'],
        limit:queryCondition.amount,
        offset:queryCondition.offset,
        order:[[queryCondition.sort,ord[req.body.sort[0]]]]
    });
    return {ldata: all_controller_info.rows,count:all_controller_info.count};
}
async function getCntListRouter(req, res){
    try{
        await updateAdminTable(req);
        let list = await getControllerList(req);
        let json = {};
        json.code = 0;
        json.data = list.ldata; 
        json.total = list.count;

        normalResponse(res,json);
    }catch(err){
        console.log(err.message)
    }
}

async function updateAdminTable(req) {
    let all_controller_info = await controller_infoModel.findAndCountAll({
        attributes: ['device_id'],
    });
    let controllers = await deveice_list.findAll({
        attributes: ['device_id'],
        group: ['device_id'],
    });
    total = all_controller_info.count;
    for (i of controllers) {
        let has = false;
        for (j of all_controller_info.rows) {
            if (i.device_id == j.device_id) {
                has = true;
            }
        }
        if (!has) {
            total++;
            controller_infoModel.create({
                device_id: i.device_id
            });
        }
    }
}

// function getDevListRouter(req,res){
//     console.log("getDevList:",req.body);
//     let errRes = {};

//     try{
//         if(!isAuthorized()){
//             let err =  new Error("unAuthorize");
//             err.code = 401;
//             throw err;
//         }

//         queryData();
//         reponseData();
//     }catch(err){
//         ErrResponse(res, err);
//     }
// }

function ErrResponse(res, errRes){
    res.shouldKeepAlive = false;
    res.status(errRes.code);
    let response_json = {
      code:errRes.code,
      message:errRes.message
    }
    res.json(response_json);
    res.end();
  }

module.exports = router;