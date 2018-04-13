import axios from 'axios'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export function clickLoginBtn() {
    return {
        type: LOGIN_SUCCESS,
        data: true
    }
}

export function getCode(callback) {
    let obj = axios({
        method: "POST",
        url: '/login/code',
    })
        .then(response => {
            callback({
                type: LOGIN_SUCCESS,
                data: response.data.data.result
            })
        })
        .catch(error => {
            callback({
                type: LOGIN_SUCCESS,
                data: 'error'
            })
        })
}