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
// 添加商品
const addGoods = (goods) => {
    const sql = "insert into goods(goods_name,goods_price,goods_number,sell_point,goods_pic,goods_introduce,cat_id,barcode,goods_state,created,updated)\
    values(?,?,?,?,?,?,?,?,?,?,?)";
    const params = [goods.goods_name, goods.goods_price, goods.goods_number,
    goods.sell_point, goods.goods_pic, goods.goods_introduce,
    goods.cat_id, goods.barcode, goods.goods_state,
    goods.updated, goods.updated];
    return BaseDao.execTransection([{ sql, params }]);
}
// 修改商品信息
const updateGoods = (goods) => {
    const sql = "update goods set \
                goods_name=?,goods_price=?,goods_number=?,\
                sell_point=?,goods_pic=?,goods_introduce=?,\
                cat_id=?,barcode=?,goods_state=?,\
                created=?,updated=? where goods_id=?";
    const params = [goods.goods_name, goods.goods_price, goods.goods_number,
    goods.sell_point, goods.goods_pic, goods.goods_introduce,
    goods.cat_id, goods.barcode, goods.goods_state,
    goods.created, goods.updated, goods.goods_id];
    return BaseDao.execTransection([{ sql, params }]);
}
// 删除商品，可以多条删除
const deleteGoods = (goodsIdArr) => {
    const temp = goodsIdArr.map(() => {
        return "?";
    })
    const sql = `delete from goods where goods_id in (${temp})`;
    const params = [...goodsIdArr];
    return BaseDao.execTransection([{ sql, params }]);

}
module.exports = { getGoodsCount, goodsList, getSearch, getGoodsCategory, addGoods, updateGoods, deleteGoods };