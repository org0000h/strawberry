let express = require('express');
let router = express.Router();

/* GET plus listing. */
router.get('/',function (req,res,next) {
    let answer = parseInt(req.query.a) + parseInt(req.query.b);
    console.log((req.query.a));
    console.log((req.query.b));
    let res_json = {
        "a+b":answer
    }
    res.json(res_json);
})

module.exports = router;