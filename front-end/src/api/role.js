import {doAuthPost} from './AxoisUtils'

// 查询所有角色
export let doRoleList =  function(){
    return doAuthPost("/role/roleList");
}
// 角色列表,分页
export let doGetListByPage = function (page) {
    return doAuthPost("/role/getListByPage", page);
}
// 对角色名，备注模糊查询
export let doSearch = function (search) {
    return doAuthPost("/role/search", search);
}
// 修改角色信息
export let doUpdateRole = function(role){
    return doAuthPost("/role/updateRole",role);
}
// 添加角色
export let doAddRole = function(role){
    return doAuthPost("/role/addRole",role);
}
// 删除角色
export let doDeleteRole = function(role){
    return doAuthPost("/role/deleteRole",role);
}
// 分配角色权限
export let doShareRolePower = function(roleMenuArr){
    return doAuthPost("/role/shareRolePower",roleMenuArr);
}