const multer = require('multer');
const fs = require('fs');
const fileUrl = "./public/uploads";

const storage = multer.diskStorage({
    // 上传文件的目录
    destination:function(req,file,cb){
        cb(null,fileUrl);
    },
    // 上传文件的名称
    filename:function(req,file,cb){
        cb(null,file.originalname);
    } 
});
const createFolder = function (folder) {
    try {
        fs.accessSync(folder);
    } catch (e) {
        fs.mkdirSync(folder);
    }
}
// 创建文件夹
createFolder(fileUrl);
// multer配置
const upload = multer({storage});
module.exports = upload;