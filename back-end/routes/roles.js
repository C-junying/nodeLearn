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

module.exports = router;