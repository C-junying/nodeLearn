import axios from "axios";

export let base = {
    host: "http://localhost:3000",
    uploadUrl: 'http://localhost:3000/goods/upload',//图片上传 post请求
};

export let doAuthPost = function (url, data) {
    return axios({
        method: "post",
        baseURL: base.host,
        url: url,
        headers: {
            Authorization: sessionStorage.getItem("token")
        },
        data: data
    });
}
export let doPost = function (url, data) {
    return axios({
        method: "post",
        baseURL: base.host,
        url: url,
        data: data
    });
}
