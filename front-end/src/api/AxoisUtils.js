import axios from "axios";

let baseUrl = "http://localhost:3000";

export let doAuthPost = function (url, data) {
    return axios({
        method: "post",
        baseURL:baseUrl,
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
        baseURL:baseUrl,
        url: url,
        data: data
    });
}
