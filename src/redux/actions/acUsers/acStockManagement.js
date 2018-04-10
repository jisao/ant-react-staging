import axios from 'axios'

export const GET_STOCK_LIST = "GET_STOCK_LIST"
export const GET_ROLE_LIST = "GET_ROLE_LIST"
export const ADD_STACK = "ADD_STACK"
export const REMOVE_STACK = "REMOVE_STACK"
export const SEARCH_STOCK_LIST = "SEARCH_STOCK_LIST"

//这个函数是查询单个用户数据

export async function searchStockList(data, callback) {
    let obj = await axios({
        method: "POST",
        url: '/stock/query',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {
            name: data.name,
            code: data.code,
        }
    })
    // console.log(obj)
    let action = {

        type: SEARCH_STOCK_LIST,
        data: obj.data
    }
    callback(action)
}


//这个函数是获取用户数据
export async function getStockList(current,pageSize, callback) {
    let obj = await axios({
        method: "POST",
        url: '/stock/query',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {
            pageNum: current,
            pageSize,

        }
    })
    // console.log(obj)
    let action = {
        type: GET_STOCK_LIST,
        data: obj.data
        // msg: obj.data.message
    }
    callback(action)
}



//新增用户的请求
export async function addStack(data, callback) {
    let obj = await axios({
        method: "POST",
        url: '/stock/add',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {
            code: data.code,
            name: data.name,

        },
    })
    let action = {
        type: ADD_STACK,
        data: obj.data
    }
    callback(action)
}
//删除用户
export async function removeStack(data, callback) {
    let obj = await axios({
        method: "POST",
        url: '/stock/delete',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {
            id: data
        }
    })
    let action = {
        type: REMOVE_STACK,
        data: obj.data
    }
    callback(action)
}
