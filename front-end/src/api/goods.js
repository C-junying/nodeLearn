import {doAuthPost} from './AxoisUtils'

// 获取菜单信息
export let doGoodsList = function(page){
    return doAuthPost("/goods/goodsList",page);
}
export let doSearch = function(search){
    return doAuthPost("/goods/search",search);
}