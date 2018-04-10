import axios from 'axios'

export const LOGOUT = "LOGOUT"
export const CHANGE_PWD = "CHANGE_PWD"



export async function userLogOut(callback) {
    let obj = await axios({
        method: "POST",
        url: '/logout',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {}
    })
    let action = {
        type: LOGOUT,
        data: obj.data
    }
    callback(action)
}
export async function changePwd(oldpasswd,newpasswd,callback) {
    let obj = await axios({
        method: "POST",
        url: '/manager/updateOurPasswd',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {
            oldpasswd,
            newpasswd
        }
    })
    console.log(obj)
    let action = {
        type: CHANGE_PWD,
        data: obj.data
    }
    callback(action)
}