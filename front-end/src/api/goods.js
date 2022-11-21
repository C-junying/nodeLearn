import {doAuthPost} from './AxoisUtils'

// 获取菜单信息
export let doGoodsList = function(page){
    return doAuthPost("/goods/goodsList",page);
}
// 对商品名，商品卖点，商品介绍模糊查询
export let doSearch = function(search){
    return doAuthPost("/goods/search",search);
}
export let doGoodsCategoryList = function(){
    return doAuthPost("/goods/getGoodsCategoryList");
}
export let doUploadProductImg = function(file){
    return doAuthPost("/goods/upload",file);
}