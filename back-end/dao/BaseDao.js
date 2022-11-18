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
module.exports = execute;