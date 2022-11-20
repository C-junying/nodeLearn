const BaseDao = require('./BaseDao')

// 查询商品总数
const getGoodsCount = () => {
    const sql = "SELECT count(*) as count FROM goods";
    return BaseDao.execute(sql);
}
// 商品获取，分页查询
const goodsList = (page) => {
    const sql = "select * from goods limit ?,?";
    const params = [(page.pageNum - 1) * page.pageSize, page.pageSize];
    return BaseDao.execute(sql, params);
}
const getSearch = (keywords) => {
    const sql = "SELECT * FROM `goods` where CONCAT(goods_name,sell_point,goods_introduce) like ?";
    const params = ["%"+keywords.search+"%"];
    return BaseDao.execute(sql, params);
}

module.exports = { getGoodsCount, goodsList, getSearch };