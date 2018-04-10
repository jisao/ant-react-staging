import axios from 'axios'


export const USER_LOGIN = "USER_LOGIN"
export const LOGIN_IN = "LOGIN_IN"


//获取验证码信息
export async function getCode(callback) {
    let obj = await axios({
        method: "POST",
        url: '/login/code',
        
        params: {}
    })
    let action = {
        type: USER_LOGIN,
        data: obj.data.data.result
    }
    callback(action)
}

//登陆
export async function loginIn(data,callback) {
    let obj = await axios({
        method: "POST",
        url: '/login/login',
        
        params: {
            uid: data.uid,
            code: data.code,
            userName: data.userName,
            passwd: data.passwd,
        }
    })
    // console.log(obj,1234)
    let action = {
        type: LOGIN_IN,
        data: obj
    }
    callback(action)
}