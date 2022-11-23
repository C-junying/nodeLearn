var express = require('express');
// promise错误可以让app.js接收
require("express-async-errors");
var router = express.Router();
var roleDao = require('../dao/RoleDao');

// 查询所有角色
router.post("/roleList", async (req, res, next) => {
    let ret = await roleDao.roleList();
    res.json({ code: 200, data: ret });
});
// 角色列表,分页
router.post("/getListByPage", async (req, res, next) => {
    let page = req.body || req.params;
    // 调用dao获取数据
    let count = await roleDao.getroleCount();
    let ret = await roleDao.rolePageList(page);
    res.json({ code: 200, data: { count: count[0].count, list: ret } });
})
// 对角色名，备注模糊查询
router.post("/search", async (req, res, next) => {
    let keywords = req.body || req.params;
    let ret = await roleDao.getSearch(keywords);
    res.json({ code: 200, data: ret });
})
// 添加角色
router.post("/addRole",async (req,res,next)=>{
    let role = req.body || req.params;
    let ret = await roleDao.addRole(role);
    res.json({code:200,data:ret,msg:"添加菜单成功"});
})
// 修改角色信息
router.post("/updateRole",async (req,res,next)=>{
    let role = req.body || req.params;
    let ret = await roleDao.updateRole(role);
    res.json({code:200,data:ret,msg:"编辑菜单成功"});
})
// 删除角色
router.post("/deleteRole",async (req,res,next)=>{
    let role = req.body || req.params;
    let ret = await roleDao.deleteRole(role);
    res.json({code:200,data:ret,msg:"删除菜单成功"});
})
// 分配角色权限
router.post("/shareRolePower",async (req,res,next)=>{
    let roleMenuArr = req.body || req.params;
    let ret = await roleDao.shareRolePower(Array.from(roleMenuArr));
    res.json({code:200,data:ret,msg:"分配角色权限成功"});
})
module.exports = router;