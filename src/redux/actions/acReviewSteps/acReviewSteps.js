import axios from 'axios'

export const GET_REVIEWSTEPS_LIST = "GET_REVIEWSTEPS_LIST"
export const GET_ROLE_LIST = "GET_ROLE_LIST"
export const ADD_REVIEWSTEPS_LIST = "ADD_REVIEWSTEPS_LIST"
export const CHANGE_REVIEWSTEPS_LIST = "CHANGE_REVIEWSTEPS_LIST"
export const REMOVE_REVIEWSTEPS_LIST = "REMOVE_REVIEWSTEPS_LIST"


//获取全部list
export async function getReviewStepList(callback) {
    let obj = await axios({
        method: "POST",
        url: '/step/query',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {}
    })
    console.log(obj)
    let action = {

        type: GET_REVIEWSTEPS_LIST,
        data: obj.data
    }
    callback(action)
}

//获取的是角色的列表
export async function getroleList(callback) {
    let obj = await axios({
        method: "POST",
        url: '/manager/roleList',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {}
    })
    // console.log(obj.data.data.result)
    let action = {
        type: GET_ROLE_LIST,
        data: obj.data
    }
    callback(action)
}
// //添加
export async function addReviewStepList(item,callback) {
    let obj = await axios({
        method: "POST",
        url: '/step/create',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        data:{
            
            step:item.step,
            ids: item.roles,
            title: item.title,
            remark: item.remark,
        }
    })
    let action = {
        type: ADD_REVIEWSTEPS_LIST,
        data: obj.data
    }
    callback(action)
}
// //修改
export async function changeReviewStepList(item,callback) {
    let obj = await axios({
        method: "POST",
        url: '/step/update',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        data:{
            id: item.id,
            step:item.step,
            ids: item.roles,
            title: item.title,
            remark: item.remark,
        }
    })
    console.log(obj)
    let action = {
        type: CHANGE_REVIEWSTEPS_LIST,
        data: obj.data
    }
    callback(action)
}
// //删除
export async function removeReviewStepList(id,callback) {
    let obj = await axios({
        method: "POST",
        url: '/step/delete',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params:{
            id
        }
    })
    console.log(obj)
    let action = {
        type: REMOVE_REVIEWSTEPS_LIST,
        data: obj.data
    }
    callback(action)
}
