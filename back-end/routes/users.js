var express = require('express');
// 加密
var bcryptc = require('bcryptjs');
// token令牌
var jwt = require("jsonwebtoken");
// promise错误可以让app.js接收
require("express-async-errors");
var router = express.Router();
var userDao = require("../dao/UserDao");

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

// 查询所有用户
router.post("/queryAll", async (req, res, next) => {
    let ret = await userDao.queryAll();
    res.json({ code: 200, data: ret });
});
// pageSize:页大小
// pageNum:那一页
// count:总数
router.post("/userList", async (req, res, next) => {
    let page = req.body || req.params;
    // 调用DAO获取数据
    let count = await userDao.getCount();
    console.log("总数：", count[0].count);
    let ret = await userDao.getListByPage(page);
    // 封装返回数据
    res.json({ code: 200, data: { count: count[0].count, list: ret } });

})
// 服务器数据校验 - 正则表达式校验
// router.post('/login', function (req, res, next) {
//     let reg = /^\w{4,10}$/;
//     if (JSON.stringify(req.body) === "{}")
//     console.log(req.body);
//     if (!req.body.email)
//         res.json({ "code": 3000, "msg": "用户邮箱不能为空！" });
//     else if (!req.body.password) {
//         res.json({ "code": 3001, "msg": "密码不能为空！" });
//     }
//     else
//         next('route');//下一个路由
// });

// 登录
router.post("/login", async (req, res, next) => {
    console.log(req.body);
    // 调用dao获取数据
    let ret = await userDao.login(req.body);
    if (ret.length === 0) {
        res.json({ code: 3002, msg: "该用户不存在" })
    }
    else {
        // bcrypt验证
        if (bcryptc.compareSync(req.body.password, ret[0].password)) {
            // 用户登录成功
            let token = jwt.sign(
                {
                    userId: ret[0].userId, userName: ret[0].userName, password: ret[0].password, roleId: ret[0].roleId,
                    roleName: ret[0].roleName, menuId: ret[0].menuId
                },
                "david",  //秘钥
                { expiresIn: 3600 * 24 } //有效期
            );
            res.json({ code: 200, data: token, msg: "登录成功" });
        } else {
            res.json({ code: 3003, msg: "密码输入错误" });
        }
    }
});
// 注册
router.post("/register", async (req, res, next) => {
    let user = req.body;
    console.log(user);
    // 设置加密强度
    let salt = bcryptc.genSaltSync(10);
    // 用bcrypt加密
    user.password = bcryptc.hashSync(user.password, salt);
    let check = await userDao.login(user);
    if (check.length > 0) {
        res.json({ code: "3007", msg: "该用户邮箱已注册" });
    } else {
        let ret = await userDao.register(user);
        res.json({ code: 200, data: ret, msg: "注册成功" });
    }
});

// 删除用户
router.post("/delete", async (req, res, next) => {
    let user = req.body || req.params;
    let ret = await userDao.deleteUser(user);
    res.json({ code: "200", data: ret, msg: "删除成功" });


});
// 编辑用户
router.post("/update", async (req, res, next) => {
    let user = req.body || req.params;
    let ret = await userDao.updateUser(user);
    res.json({ code: 200, data: ret, msg: "用户编辑成功" });
});
// 获取token中的信息
router.post("/get", async (req, res, next) => {
    res.json({ code: 200, data: req.user })
})
module.exports = router;
