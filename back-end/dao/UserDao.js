const BaseDao = require('./BaseDao')

//查询所有⽤户
const queryAll = () => {
    const sql = "select * from user";
    return BaseDao.execute(sql);
}
// 查询用户总数
const getCount = () => {
    const sql = "SELECT count(*) as count FROM user";
    return BaseDao.execute(sql);
}
// 分页查询
const getListByPage = (page) => {
    const sql = "SELECT DISTINCT u.*,r.* from user u LEFT JOIN user_role ur on u.userId = ur.userId LEFT JOIN role r on ur.roleId = r.roleId ORDER BY u.userId limit ?,?";
    const params = [(page.pageNum - 1) * page.pageSize, page.pageSize];
    return BaseDao.execute(sql, params);
}
//登录
const login = (user) => {
    const sql = "SELECT DISTINCT u.*,r.* from user u LEFT JOIN user_role ur on u.userId = ur.userId LEFT JOIN role r on ur.roleId = r.roleId where u.email=?";
    const params = [user.email];
    return BaseDao.execute(sql, params);
}
// 注册
const register = (user) => {
    const arr = [
        {
            sql: "insert into user(userName, password, email, createTime) values(?,?,?,?)",
            params: [user.userName, user.password, user.email, user.createTime],
        },
        {
            sql: "insert into user_role(userId,roleId) values(?,?)",
            params: [user.userId, user.roleId]
        }
    ]
    return BaseDao.execTransectionByReturnId(arr);
}

// 删除用户
const deleteUser = (user) => {
    const arr = [
        {
            sql: 'delete from user where userId = ?',
            params: [user.userId]
        },
        {
            sql: 'delete from user_role where userId = ?',
            params: [user.userId]
        }
    ]
    return BaseDao.execTransection(arr);
}
// 编辑用户
const updateUser = (user) => {
    const arr = [
        {
            sql: "update user set userName=?,password=?,createTime=? where userId=?",
            params: [user.userName, user.password, user.createTime, user.userId]
        },
        {
            sql: 'delete from user_role where userId = ?',
            params: [user.userId]
        },
        {
            sql: 'insert into user_role(userId,roleId) values(?,?)',
            params: [user.userId, user.roleId]
        }
    ]
    return BaseDao.execTransection(arr);
}
module.exports = { queryAll, getListByPage, getCount, login, register, deleteUser, updateUser }