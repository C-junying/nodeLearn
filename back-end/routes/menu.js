var express = require('express');
// promise错误可以让app.js接收
require("express-async-errors");
var router = express.Router();
var menuDao = require("../dao/MenuDao");

/* post users listing. */
router.post('/', function (req, res, next) {
    res.send('respond with a resource');
});
//根据角色获得菜单
router.post("/menuList", async (req, res, next) => {
    // 调用dao获取数据
    let ret = await menuDao.queryByRoleId(req.user);
    let data = JSON.parse(JSON.stringify(ret));
    let tree = data.filter((item) => {
        if (item.pId === -1) {
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



module.exports = router;