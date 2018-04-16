import axios from 'axios'
//定义fetch函数，config为配置
import { openNotification } from './tool'

// export function fetch({ url, data }) {
//     //返回promise对象
//     return new Promise((resolve, reject) => {
//         axios.post(url).then(res => {
//             resolve(res.data)
//         }).catch(err => {
//             reject(err)
//         })
//     });
// }

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
export function fetch({ url, method }, callback) {
    let obj = axios({
        method: method || "POST",
        url,
    })
        .then(response => {
            if (response.data.code > 0) {
                openNotification({ description: response.data.message })
            }

            if (response.data.code === 0) {
                callback(response.data)
            }
        })
        .catch(error => {
            if (error) {
                openNotification({ description: `${url}请求数据失败` })
            }
        })
}