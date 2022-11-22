var express = require('express');
// promise错误可以让app.js接收
require("express-async-errors");
var router = express.Router();
var upload = require("../dao/FileDao");
var goodsDao = require("../dao/goodsDao");

// 商品获取
router.post('/goodsList', async (req, res, next) => {
    let page = req.body || req.params;
    let count = await goodsDao.getGoodsCount();
    let list = await goodsDao.goodsList(page);
    res.json({ code: 200, data: { count: count[0].count, list } });
})
// 对商品名，商品卖点，商品介绍模糊查询
router.post("/search", async (req, res, next) => {
    let keywords = req.body || req.params;
    console.log(keywords);
    let ret = await goodsDao.getSearch(keywords);
    res.json({ code: 200, data: ret });
})
// 查询所有商品类目
router.post("/getGoodsCategoryList", async (req, res, next) => {
    let ret = await goodsDao.getGoodsCategory();
    let data = JSON.parse(JSON.stringify(ret));
    // 树化
    let tree = data.filter((item) => {
        if (item.parent_id === 0) {
            return true;
        }
        else {
            for (let i = 0; i < data.length; i++) {
                if (data[i].cat_id === item.parent_id) {
                    data[i].cats = data[i].cats || [];
                    data[i].cats.push(item);
                }
            }
        }
    })
    res.json({ code: 200, data: tree });
})
// 文件上传
router.post('/upload', upload.single('file'), function (req, res, next) {
    var file = req.file;
    console.log('文件类型：%s', file.mimetype);
    console.log('原始文件名：%s', file.originalname);
    console.log('文件大小：%s', file.size);
    console.log('文件保存路径：%s', file.path);
    res.json({ code: 200, data: { file, img: `http://localhost:3000/images/${file.originalname}` } });
});
// 添加商品
router.post("/addGoods", async (req, res, next) => {
    let goods = req.body || req.params;
    let ret = await goodsDao.addGoods(goods);
    res.json({ code: 200, data: ret, msg: "添加商品成功" });
});
// 修改商品信息
router.post("/updateGoods", async (req, res, next) => {
    let goods = req.body || req.params;
    let ret = await goodsDao.updateGoods(goods);
    res.json({ code: 200, data: ret, msg: "修改商品信息成功" });
});
// 删除商品
router.post("/deleteGoods", async (req, res, next) => {
    // 前端返回对象数组
    let goods = req.body || req.params;
    let goodsIdArr = goods.map(val=>val.goods_id);
    let ret = await goodsDao.deleteGoods(goodsIdArr);
    res.json({ code: 200, data: ret, msg: "删除商品成功" });
});
module.exports = router;