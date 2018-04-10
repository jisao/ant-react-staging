import axios from 'axios'

export const GET_INDEX_MSG = "GET_INDEX_MSG"
export const ADD_INDEX_MSG = "ADD_INDEX_MSG"
export const CHANGE_INDEX_MSG = "CAHNGE_INDEX_MSG"
export const REMOVE_INDEX_MSG = "REMOVE_INDEX_MSG"


//获取列表
export async function getIndexMsg(callback) {
    let obj = await axios({
        method: "POST",
        url: '/appConfig/queryHomeMenu',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {}
    })
    console.log(obj)
    let action = {
        type: GET_INDEX_MSG,
        data: obj.data
    }
    callback(action)
}
//添加轮播图
export async function addIndexMsg(item, callback) {
    let obj = await axios({
        method: "POST",
        url: '/appConfig/createHomeMenu',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {},
        data: {
            title: item.title,
            sort: item.sort,
            imageUrl: item.imageUrl,
            use: item.isUse,
            jumpType: item.jumpType,

            jumpurl: item.jumpurl,
            jumptitle: item.jumpTitle,
            share: item.share,

            allocateType: item.allocateType,
            tag: item.tag,
        }
    })
    console.log(obj)
    let action = {
        type: ADD_INDEX_MSG,
        data: obj.data
    }
    callback(action)
}



//修改轮播图
export async function changeIndexMsg(item, callback) {
    let obj = await axios({
        method: "POST",
        url: '/appConfig/update',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {},
        data: {
            id: item.id,
            title: item.title,
            sort: item.sort,
            imageUrl: item.imageUrl,
            use: item.isUse,
            jumpType: item.jumpType,

            jumpurl: item.jumpurl,
            jumptitle: item.jumpTitle,
            share: item.share,

            allocateType: item.allocateType,
            tag: item.tag,
        }
    })
    console.log(obj)
    let action = {
        type: CHANGE_INDEX_MSG,
        data: obj.data
    }
    callback(action)
}




//删除轮播图
export async function removeIndexMsg(item, callback) {
    let obj = await axios({
        method: "POST",
        url: '/appConfig/remove',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {
            id: item
        },

    })
    console.log(obj)
    let action = {
        type: REMOVE_INDEX_MSG,
        data: obj.data
    }
    callback(action)
}