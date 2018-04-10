import axios from 'axios'

export const GET_RESOURCE_LIST = "GET_RESOURCE_LIST"
export const ADD_RESOURCE = "ADD_RESOURCE"
export const CHANGE_RESOURCE = "CHANGE_RESOURCE"
export const REMOVE_RESOURCE = "REMOVE_RESOURCE"




//获取列表
export async function getResourceList(callback) {
    let obj = await axios({
        method: "POST",
        url: '/manager/getPermiss',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {}
    })
    // console.log(obj)
    let action = {
        type: GET_RESOURCE_LIST,
        data: obj.data
    }
    callback(action)
}


//新增
export async function addResource(item,callback) {
    let obj = await axios({
        method: "POST",
        url: '/manager/createPermiss',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {
            url:item.url,
            urlName: item.urlName,
            parentId: item.parentId,
            requestUrl: item.requestUrl
        }
    })
    // console.log(obj)
    let action = {
        type: ADD_RESOURCE,
        data: obj.data
    }
    callback(action)
}


//修改
export async function changeResource(item, callback) {
    console.log(item)
    let obj = await axios({
        method: "POST",
        url: '/manager/updatePermiss',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {
            url: item.url,
            urlName: item.urlName,
            id: item.parentId,
            requestUrl: item.requestUrl
        }
    })
    // console.log(obj)
    let action = {
        type: CHANGE_RESOURCE,
        data: obj.data
    }
    callback(action)
}

//删除
export async function removeResource(item, callback) {
    console.log(item)
    let obj = await axios({
        method: "POST",
        url: '/manager/removePermiss',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {
            id: item.id,
        }
    })
    let action = {
        type: REMOVE_RESOURCE,
        data: obj.data
    }
    callback(action)
}



