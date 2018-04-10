import axios from 'axios'

export const GET_ROLE_LIST = "GET_ROLE_LIST"
export const REMOVE_ROLE = "REMOVE_ROLE"
export const CHANGE_ROLE = "CHANGE_ROLE"
export const ADD_ROLE = "ADD_ROLE"
export const GET_ROLE_RESOURCE = "GET_ROLE_RESOURCE"
export const CHANGE_ROLE_RESOURCE = "CHANGE_ROLE_RESOURCE"



//获取的是角色的列表
export async function getroleList(callback) {
    let obj = await axios({
        method: "POST",
        url: '/manager/roleList',
        headers:{
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {}
    })
    // console.log(obj)
    let action = {
        type: GET_ROLE_LIST,
        data: obj.data
    }
    callback(action)
}
//删除角色
export async function removeRole(data,callback) {
    let obj = await axios({
        method: "POST",
        url: '/manager/removeRole',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {
            id:data
        }
    })
    // console.log(obj)
    let action = {
        type: REMOVE_ROLE,
        data: obj.data
    }
    callback(action)
}
//修改角色
export async function changeRole(data, callback) {
    // console.log(data)
    let obj = await axios({
        method: "POST",
        url: '/manager/updateRole',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {
            id: data.id,
            roleName: data.roleName,
            roleCode: data.roleCode
        }
    })
    let action = {
        type: CHANGE_ROLE,
        data: obj.data
    }
    callback(action)
}
//添加角色
export async function addRole(data, callback) {
    // console.log(data)
    let obj = await axios({
        method: "POST",
        url: '/manager/createRole',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {
            roleName: data.roleName,
            roleCode: data.roleCode,
        }
    })
    let action = {
        type: ADD_ROLE,
        data: obj.data
    }
    callback(action)
}

//获取单个角色的资源
export async function getRoleResource(data, callback) {
    // console.log(data)
    let obj = await axios({
        method: "POST",
        // url: '/manager/getPermissByRole',
        url: '/manager/showRolePermission',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {
         id:data
        }
    })
    // console.log(obj)
    let action = {
        type: GET_ROLE_RESOURCE,
        data: obj.data
    }
    callback(action)
}



//修改角色对应的资源
export async function changeRoleResource(id,data, callback) {
    // console.log(id,data)
    let obj = await axios({
        method: "POST",
        url: '/manager/updateRolePermiss',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {
             id: id
        },
        data: {
            ids: data,
        }
    })
    // console.log(data)
    // console.log(obj)
    let action = {
        type: CHANGE_ROLE_RESOURCE,
        data: obj.data
    }
    callback(action)
}