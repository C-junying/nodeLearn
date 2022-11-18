const exec = require('./BaseDao')

//查询所有⽤户
const queryAll = () => {
    const sql = "select * from user";
    return exec(sql);
}
// 查询用户总数
const getCount = ()=>{
    const sql = "SELECT count(*) as sum FROM user";
    return exec(sql);
}
// 分页查询
const getListByPage = (page)=>{
    const sql = "select * from user limit ?,?";
    const params = [(page.pageNum-1)*page.pageSize,page.pageSize];
    return exec(sql,params);
}
//登录
const login = (user) => {
    const sql = "SELECT user.*,role.* from user,user_role,role\
    where user.userId = user_role.userId and user_role.roleId= role.roleId and user.email=?";
    const params = [user.email];
    return exec(sql,params);
}
// 注册
const register = (user)=>{
    const sql = "insert into user(userName, password, email, createTime) values(?,?,?,?)";
    const params = [user.userName,user.password,user.email,user.createTime];
    return exec(sql,params);
}

// 删除用户
const deleteUser = (user)=>{
    const sql = "delete from user where email=?";
    const params = [user.email];
    return exec(sql,params);
}
// 修改用户
const updateUser = (user)=>{
    const sql = "update user set userName=?,password=?,createTime=? where email=?";
    const params = [user.userName,user.password,user.createTime,user.email];
    return exec(sql,params);
}
module.exports = {queryAll,getListByPage,getCount,login,register,deleteUser,updateUser}