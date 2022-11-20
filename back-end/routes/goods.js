var express = require('express');
// promise错误可以让app.js接收
require("express-async-errors");
var router = express.Router();
var goodsDao = require("../dao/goodsDao");

router.post('/goodsList', async (req, res, next) => {
    let page = req.body || req.params;
    let count = await goodsDao.getGoodsCount();
    let list = await goodsDao.goodsList(page);
    res.json({ code: 200, data: { count: count[0].count, list } });
})
router.post("/search", async (req, res, next) => {
    let keywords = req.body || req.params;
    console.log(keywords);
    let ret = await goodsDao.getSearch(keywords);
    res.json({ code: 200, data: ret });
})

module.exports = router;