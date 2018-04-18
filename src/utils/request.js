import axios from 'axios'
import { openNotification } from './tool'
var baseURL = ''
if (process.env.NODE_ENV === 'development') {
    baseURL = 'http://120.78.83.217:8808/art-cms';
} else if (process.env.NODE_ENV === 'production') {
    baseURL = '/art-cms';
}
/*通过action调用api*/
export function request({ url, method, callback, type }) {
    let obj = axios({
        method: method || "POST",
        url,
    })
        .then(response => {
            console.log(response.data);
            if (response.data.code > 0) {
                openNotification({ description: response.data.message })
            }

            if (response.data.code === 0) {
                callback({
                    type,
                    data: response.data
                })
            }
        })
        .catch(error => {
            if (error) {
                openNotification({ description: `${url}请求数据失败` })
            }
        })
}

/*直接调用api*/
export function fetch({ url, method, headers, params, data, success, fail }) {
    const newAxios = axios.create({
        //定义请求根目录
        baseURL
    });
    let obj = newAxios({
        url,
        method: "POST",
        headers: headers || {},
        params: params || {},
        data: data || {},
    })
        .then(response => {
            if (response.data.code > 0) {
                openNotification({ description: response.data.message })
                fail(response)
            }

            if (response.data.code === 0) {
                success(response.data)
            }
        })
        .catch(error => {
            if (error) {
                openNotification({ description: `${url}请求数据失败` })
                fail(error)
            }
        })
}