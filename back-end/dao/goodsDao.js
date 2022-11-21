const BaseDao = require('./BaseDao')

// 查询商品总数
const getGoodsCount = () => {
    const sql = "SELECT count(*) as count FROM goods";
    return BaseDao.execute(sql);
}
// 商品获取，分页查询
const goodsList = (page) => {
    const sql = "select goods.*,goods_cats.cat_name from goods,goods_cats where goods.cat_id = goods_cats.cat_id limit ?,?";
    const params = [(page.pageNum - 1) * page.pageSize, page.pageSize];
    return BaseDao.execute(sql, params);
}
// 对商品名，商品卖点，商品介绍模糊查询
const getSearch = (keywords) => {
    const sql = "select goods.*,goods_cats.cat_name from goods,goods_cats where goods.cat_id = goods_cats.cat_id and CONCAT(goods_name,sell_point,goods_introduce) like ?";
    const params = ["%" + keywords.search + "%"];
    return BaseDao.execute(sql, params);
}
// 查询所有商品类目
const getGoodsCategory = () => {
    const sql = "SELECT * FROM goods_cats";
    return BaseDao.execute(sql);
}
module.exports = { getGoodsCount, goodsList, getSearch, getGoodsCategory };