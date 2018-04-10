import axios from 'axios'

export const GET_USERS_LIST = "GET_USERS_LIST"
export const GET_ROLE_LIST = "GET_ROLE_LIST"
export const ADD_USERS = "ADD_USERS"
export const REMOVE_USERS = "REMOVE_USERS"
export const CHANGE_USERS = "CHANGE_USERS"
export const GET_USER_ROLE = "GET_USER_ROLE"
export const SEARCH_USERS_LIST = "SEARCH_USERS_LIST"

//这个函数是查询单个用户数据

export async function searchUsersList(data, callback){
    let obj = await axios({
        method: "POST",
        url: '/manager/userList',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {
            userName: data.userName,
            realName: data.realName,
            userPhone: data.userPhone,
        }
    })
    // console.log(obj)
    let action = {
        
        type: SEARCH_USERS_LIST,
        data: obj.data.data
        // msg: obj.data.message
    }
    callback(action)
}


//这个函数是获取用户数据
export async function getUsersList(current, callback) {
    let obj = await axios({
        method: "POST",
        url: '/manager/userList',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {
            pageNum: current,

        }
    })
    // console.log(obj)
    let action = {
        type: GET_USERS_LIST ,
        data: obj.data.data,
        // msg: obj.data.message
    }
    callback(action)
}


//获取的是角色的列表
export async function getroleList(callback) {
    let obj = await axios({
        method: "POST",
        url:'/manager/roleList',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params:{}
    })
    // console.log(obj.data.data.result)
    let action = {
        type:GET_ROLE_LIST,
        data: obj.data.data.result
    }
    callback(action)
}
//新增用户的请求
export async function addUsers(data,callback) {
    // console.log(data)
    let obj = await axios({
        method: "POST",
        url: '/manager/createUser',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {
            userName: data.userName,
            passwd: data.passwd,
            realName: data.realName,
            userPhone: data.userPhone,
            
        },
        data:{
            ids: data.ids,
        }
    })
    // console.log(obj)
    let action = {
        type: ADD_USERS,
        data: obj
    }
    callback(action)
}
//删除用户
export async function removeUsers(data, callback) {
    let obj = await axios({
        method: "POST",
        url: '/manager/removeUser',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {
            id:data
        }
    })
    let action = {
        type: REMOVE_USERS,
        data: obj
    }
    callback(action)
}
//修改用户
export async function changeUsers(data, callback) {

    let obj = await axios({
        method: "POST",
        url: '/manager/updateUser',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {
            userName: data.userName,
            passwd: data.passwd,
            realName: data.realName,
            userPhone: data.userPhone,
            id: data.id,
        },
        data:{
            ids: data.ids,
        }
    })
    console.log(data)
    console.log(obj)
    let action = {
        type: CHANGE_USERS,
        data: obj
    }
    callback(action)
}
//获取单个用户的角色
export async function getUserRole(data, callback) {
    let obj = await axios({
        method: "POST",
        url: '/manager/getUserRole',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {
            id: data
        }
    })
    console.log(obj)
    // console.log(obj.data.data.result,1112)
    let action = {
        type: GET_USER_ROLE,
        data: obj.data.data.result
    }
    callback(action)
}

