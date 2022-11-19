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
module.exports = { execute, execTransection };