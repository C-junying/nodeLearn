var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/test', function (req, res, next) {
    res.json({code:200,data:req.query,msg:"Hello World"});
});

module.exports = router;
