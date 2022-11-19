import {doAuthPost,doPost} from './AxoisUtils'

// 登录操作
export let doLogin = function(user){
    return doPost("/user/login",user);
}

// 分页获取用户列表
export let doUserList = function(page){
    return doAuthPost("/user/userList",page);
}
// 编辑用户操作
export let doUserEdit = function(user){
    return doAuthPost("/user/update",user);
}
// 添加用户操作
export let doUserAdd = function(user){
    return doAuthPost("/user/register",user);
}
// 删除操作
export let doDeleteUser = function(user){
    return doAuthPost("/user/delete",user);
}
// 获取用户信息
export let doGet = function(){
    return doAuthPost("/user/get");
}