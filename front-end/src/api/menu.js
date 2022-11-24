import { doAuthPost } from './AxoisUtils'

// 获取所有菜单
export let doRoleSelect = function(){
    return doAuthPost("/menu/roleSelect");
}
// 获取所有一级二级菜单
export let doQueryAll = function(){
    return doAuthPost("/menu/queryAll");
}
// 根据token角色ID获取菜单信息
export let doMenuList = function () {
    return doAuthPost("/menu/menuList");
}
// 根据角色ID获取菜单信息
export let doRoleIdMenuList = function (role) {
    return doAuthPost("/menu/roleIdMenuList",role);
}
// 获取菜单信息,分页
export let doGetListByPage = function (page) {
    return doAuthPost("/menu/getListByPage", page);
}
// 对菜单ID，菜单名称，菜单路径模糊查询
export let doSearch = function (search) {
    return doAuthPost("/menu/search", search);
}
// 编辑菜单操作
export let doUpdateMenu = function(menu){
    return doAuthPost("/menu/updateMenu",menu);
}
// 添加菜单操作
export let doAddMenu = function(menu){
    return doAuthPost("/menu/addMenu",menu);
}
// 删除菜单操作
export let doDeleteMenu = function(menu){
    return doAuthPost("/menu/deleteMenu",menu);
}