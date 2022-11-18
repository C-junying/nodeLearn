const exec = require('./BaseDao')

//通过roleId获取菜单列表
const queryByRoleId = (user) => {
    const sql = "SELECT role_menu.roleId,menu.* FROM role_menu,menu\
    where role_menu.menuId = menu.menuId and role_menu.roleId = ?";
    const params = [user.roleId];
    return exec(sql, params);
}

module.exports = { queryByRoleId };