const BaseDao = require('./BaseDao')

// 查询所有角色
const roleList = () => {
    const sql = "select * from role";
    return BaseDao.execute(sql);
}
// 添加角色
const addRole = (role) => {
    const arr = [
        {
            sql: "insert into role(roleName,remark) values(?,?)",
            params: [role.roleName, role.remark]
        }
    ];
    return BaseDao.execTransection(arr);
}

module.exports = { roleList, addRole };