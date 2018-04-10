import axios from 'axios'


export const GET_NETNEWS_LIST = "GET_NETNEWS_LIST"
export const GET_NETNEWS_LIST1 = "GET_NETNEWS_LIST1"
export const ADD_NETNEWS_LIST = "ADD_NETNEWS_LIST"
export const ADD_NETNEWS_LIST1 = "ADD_NETNEWS_LIST1"
export const CHANGE_NETNEWS_LIST = "CHANGE_NETNEWS_LIST"
export const CHANGE_NETNEWS_LIST1 = "CHANGE_NETNEWS_LIST1"
export const REMOVE_NETNEWS_LIST = "REMOVE_NETNEWS_LIST"


//获取文章列表
export async function getNetnewsList(pageNum,pageSize,callback) {
    let obj = await axios({
        method: "POST",
        url: '/news/query',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {
            pageNum,
            pageSize,
            type:'TEXT'
        }
    })
    let action = {
        type: GET_NETNEWS_LIST,
        data: obj.data
    }
    callback(action)
}
//获取图片列表
export async function getNetnewsList1(pageNum,pageSize,callback) {
    let obj = await axios({
        method: "POST",
        url: '/news/query',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {
            pageNum,
            pageSize,
            type:'IMAGE'
        }
    })
    let action = {
        type: GET_NETNEWS_LIST1,
        data: obj.data
    }
    callback(action)
}


//新增新闻列表
export async function addNetnewsList(item,callback) {
    let obj = await axios({
        method: "POST",
        url: '/news/create',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {
            title:item.title,
            url:item.url,
            top:item.top,
            type:'TEXT'
        }
    })
    let action = {
        type: ADD_NETNEWS_LIST,
        data: obj.data
    }
    callback(action)
}

//新增pic列表
export async function addNetnewsList1(item,callback) {
    let obj = await axios({
        method: "POST",
        url: '/news/create',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {
            title:item.title,
            url:item.url,
            top:item.top,
            image:item.image,
            type:'IMAGE'
        }
    })
    let action = {
        type: ADD_NETNEWS_LIST1,
        data: obj.data
    }
    callback(action)
}

//修改
export async function changeNetnewsList(item,callback) {
    let obj = await axios({
        method: "POST",
        url: '/news/update',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {
            id:item.id,
            title:item.title,
            url:item.url,
            top:item.top,
            type:'TEXT'
        }
    })
    let action = {
        type: CHANGE_NETNEWS_LIST,
        data: obj.data
    }
    callback(action)
}
//修改pic
export async function changeNetnewsList1(item,callback) {
    let obj = await axios({
        method: "POST",
        url: '/news/update',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {
            id:item.id,
            title:item.title,
            url:item.url,
            top:item.top,
            image:item.image,
            type:'IMAGE'
        }
    })
    let action = {
        type: CHANGE_NETNEWS_LIST1,
        data: obj.data
    }
    callback(action)
}

//删除
export async function removeNetnewsList(item,callback) {
    let obj = await axios({
        method: "POST",
        url: '/news/delete',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {
            id:item,
        }
    })
    let action = {
        type: REMOVE_NETNEWS_LIST,
        data: obj.data
    }
    callback(action)
}
