import {doAuthPost} from './AxoisUtils'

// 获取菜单信息
export let doMenuList = function(){
    return doAuthPost("/menu/menuList");
}