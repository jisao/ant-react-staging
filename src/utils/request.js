import axios from 'axios';
import { openNotification } from './tool';
import NProgress from 'nprogress';
var baseURL=''
if (process.env.NODE_ENV === 'development') {
    baseURL = 'http://xxxxxx/controller-mng';
} else if (process.env.NODE_ENV === 'production') {
    baseURL = '/controller-mng';
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
    NProgress.start()
    const newAxios = axios.create({
        //定义请求根目录
        baseURL
    });
    let obj = newAxios({
        url,
        method: method || "POST",
        headers: headers || {},
        params: params || {},
        data: data || {},
    })
        .then(response => {
            NProgress.done()
            if (response.data.code > 0) {
                openNotification({ description: response.data.message })
                fail(response)
            }

            if (response.data.code === 0) {
                success(response.data)
            }
        })
        .catch(error => {
            NProgress.done()
            if (error) {
                openNotification({ description: `${url}请求数据失败` })
                if (fail)
                    fail(error)
            }
        })
}