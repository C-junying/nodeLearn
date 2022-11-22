import { doAuthPost } from './AxoisUtils'

// 获取菜单信息
export let doGoodsList = function (page) {
    return doAuthPost("/goods/goodsList", page);
}
// 对商品名，商品卖点，商品介绍模糊查询
export let doSearch = function (search) {
    return doAuthPost("/goods/search", search);
}
// 返回所有类目
export let doGoodsCategoryList = function () {
    return doAuthPost("/goods/getGoodsCategoryList");
}
// 上传文件
export let doUploadProductImg = function (file) {
    return doAuthPost("/goods/upload", file);
}
// 增加商品
export let doAddGoods = function (goods) {
    return doAuthPost("/goods/addGoods", goods);
}
// 修改商品信息
export let doUpdateGoods = function (goods) {
    return doAuthPost("/goods/updateGoods", goods);
}
// 删除商品
export let doDeleteGoods = function (goods) {
    return doAuthPost("/goods/deleteGoods", goods);
}