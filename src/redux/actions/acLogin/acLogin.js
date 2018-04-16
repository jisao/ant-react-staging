import axios from 'axios'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

import { fetch, request } from '../../../utils/request'

export function clickLoginBtn() {
    return {
        type: LOGIN_SUCCESS,
        data: true
    }
}

export function getCode(callback) {
    // let obj = axios({
    //     method: "POST",
    //     url: '/login/code',
    // })
    //     .then(response => {
    //         callback({
    //             type: LOGIN_SUCCESS,
    //             data: response.data.data.result
    //         })
    //     })
    //     .catch(error => {
    //         callback({
    //             type: LOGIN_SUCCESS,
    //             data: 'error'
    //         })
    //     })
    request({
        url: '/login/code',
        type: LOGIN_SUCCESS,
        callback,
    })
}

// export async function getUser() {
//     return fetch({
//         //这里的url为baseURL下接口地址，如baseURL为'www.baidu.com',接口地址为'www.baidu.com/api/getdata',那么url里就写'api/getdata'
//         url: '/login/code',
//     })
// }
