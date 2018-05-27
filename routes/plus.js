var express = require('express');
var router = express.Router();

/* GET plus listing. */
router.get('/',function (req,res,next) {
    var answer = parseInt(req.query.a) + parseInt(req.query.b);
    console.log((req.query.a));
    console.log((req.query.b));
    asn = 'a+b= ';

    res.send(asn + answer.toString());
})

module.exports = router;