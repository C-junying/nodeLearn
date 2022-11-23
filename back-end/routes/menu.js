var express = require('express');
// promise错误可以让app.js接收
require("express-async-errors");
var router = express.Router();
var menuDao = require("../dao/MenuDao");

/* post users listing. */
router.post('/', function (req, res, next) {
    res.send('respond with a resource');
});
// 获取所有一级二级菜单
router.post("/queryAll", async (req, res, next) => {
    // 调用dao获取数据
    let ret = await menuDao.queryAll();
    res.json({ code: 200, data: ret });
})
//根据角色获得菜单
router.post("/menuList", async (req, res, next) => {
    // 调用dao获取数据
    let ret = await menuDao.queryByRoleId(req.user);
    // 二级菜单树化
    let data = JSON.parse(JSON.stringify(ret));
    let tree = data.filter((item) => {
        if (item.pId === 0) {
            return true;
        }
        else {
            for (let i = 0; i < data.length; i++) {
                if (data[i].menuId === item.pId) {
                    data[i].menus = data[i].menus || [];
                    data[i].menus.push(item);
                }
            }
        }
    })
    res.json({ code: 200, data: tree });
})
// 菜单列表
router.post("/getListByPage", async (req, res, next) => {
    let page = req.body || req.params;
    // 调用dao获取数据
    let count = await menuDao.getCount();
    let ret = await menuDao.getListByPage(page);
    res.json({ code: 200, data: { count: count[0].count, list: ret } });
})
// 对菜单ID，菜单名称，菜单路径模糊查询
router.post("/search", async (req, res, next) => {
    let keywords = req.body || req.params;
    let ret = await menuDao.getSearch(keywords);
    res.json({ code: 200, data: ret });
})
// 添加菜单
router.post("/addMenu",async (req,res,next)=>{
    let menu = req.body || req.params;
    console.log("添加菜单:",menu);
    let ret = await menuDao.addMenu(menu);
    res.json({code:200,data:ret,msg:"添加菜单成功"});
})
// 编辑菜单
router.post("/updateMenu",async (req,res,next)=>{
    let menu = req.body || req.params;
    let ret = await menuDao.updateMenu(menu);
    res.json({code:200,data:ret,msg:"编辑菜单成功"});
})
// 删除菜单
router.post("/deleteMenu",async (req,res,next)=>{
    let menu = req.body || req.params;
    let ret = await menuDao.deleteMenu(menu);
    res.json({code:200,data:ret,msg:"删除菜单成功"});
})
module.exports = router;