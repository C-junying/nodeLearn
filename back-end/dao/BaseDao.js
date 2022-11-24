const mysql = require('mysql')
// 创建数据库连接池pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'test',
    connectionLimit: 10,//可以不添加，使⽤默认值
    supportBigNumbers: true,
    debug: ['ComQueryPacket']   //显示sql语句
});
// 显示sql语句
// pool.on('connection', function (connection) {
//     connection.on('enqueue', function (sequence) {
//         if ('Query' === sequence.constructor.name) {
//             console.log('sql -> ', sequence.sql);
//         }
//     });
// });
//执⾏SQL的函数
function execute(sql, params) {
    const promise = new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
                return;
            }
            connection.query(sql, params, function (err, results) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(results);
                connection.release();
            });
        });
    });
    return promise;
}
const execTransection = (sqlArr) => {
    return new Promise((resolve, reject) => {
        var promiseArr = [];
        pool.getConnection(function (err, connection) {
            if (err) {
                return reject(err)
            }
            connection.beginTransaction(err => {
                if (err) {
                    return reject('开启事务失败')
                }
                // 将所有需要执行的sql封装为数组
                promiseArr = sqlArr.map(({ sql, params }) => {
                    return new Promise((resolve, reject) => {
                        connection.query(sql, params, (e, rows, fields) => {
                            e ? reject(e) : resolve({ rows, success: true })
                        })
                    })
                })
                // Promise调用所有sql，一旦出错，回滚，否则，提交事务并释放链接
                Promise.all(promiseArr).then(res => {
                    connection.commit((error) => {
                        if (error) {
                            console.log('事务提交失败')
                            reject(error)
                        }
                    })
                    connection.release()  // 释放链接
                    resolve(res)
                }).catch(err => {
                    connection.rollback(() => {
                        console.log('数据操作回滚')
                    })
                    reject(err)
                })
            })
        });
    })
}
/*
说明：
    1、参数数组中第一个对象为向一的一方插入对象，例如订单插入
    2、参数数组中第二个对象开始为向多的一方插入对象，例如订单详情
    3、第二个对象开始参数的第一个值为一的一方的主键Id，例如订单详情对象中的第一个插入参数为订单Id
    [insert into order (userId,address,fee) values (?,?,?), 
     insert into orderItem (orderId,productId,count) values (?,?,?)]
*/
const execTransectionByReturnId = (sqlArr) => {
    return new Promise((resolve, reject) => {
        var promiseArr = [];
        pool.getConnection(function (err, connection) {
            if (err) {
                return reject(err)
            }
            connection.beginTransaction(async err => {
                try {
                    if (err) {
                        return reject('开启事务失败')
                    }
                    // 执行第一个sql并返回主键值，成功继续操作，失败返回。
                    let id = await new Promise((resolve, reject) => (
                        connection.query(sqlArr[0].sql, sqlArr[0].params, (e, rows, fields) => {
                            if (e) {
                                connection.rollback(() => {
                                    console.log('数据操作回滚')
                                })
                                reject(e)
                            } else {
                                resolve(rows.insertId); //获得主键
                            }
                        })
                    ))
                    // 删除第一个sql语句对象
                    sqlArr.splice(0, 1)
                    // 更新每个params数组的第一个参数为刚插入主键
                    for (const { sql, params } of sqlArr) {
                        let flag = params.every(val=>{
                            return Array.isArray(val);
                        });
                        if(!flag){
                            params[0] = id;
                        }else{
                            for(const firstElement of params[0]){
                                firstElement[0] = id;
                            };
                            // 希望@params = [[],[],[]]  这种类型的数组
                        }
                        await new Promise((resolve, reject) => {
                            connection.query(sql, params, (e, rows, fields) => {
                                e ? reject(e) : resolve(rows.insertId)
                            })
                        })
                    }
                    //提交事务
                    connection.commit((error) => {
                        if (error) {
                            console.log('事务提交失败')
                            reject(error)
                        }
                    })
                    // 释放链接
                    connection.release()
                    resolve(id)
                } catch (err) {
                    connection.rollback(() => {
                        console.log('数据操作回滚')
                    })
                    reject(err)
                }
            })
        });
    })
}
module.exports = { execute, execTransection, execTransectionByReturnId };