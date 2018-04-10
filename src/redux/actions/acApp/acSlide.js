import axios from 'axios'

export const GET_SLIDE_LIST = "GET_SLIDE_LIST"
export const ADD_SLIDE_LIST = "ADD_SLIDE_LIST"
export const CHANGE_SLIDE_LIST = "CHANGE_SLIDE_LIST"
export const REMOVE_SLIDE_LIST = "REMOVE_SLIDE_LIST"


//获取列表
export async function getSlideList(callback) {
    let obj = await axios({
        method: "POST",
        url: '/appConfig/queryArouselImg',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {}
    })
    console.log(obj)
    let action = {
        type: GET_SLIDE_LIST,
        data: obj.data
    }
    callback(action)
}
//添加轮播图
export async function addSlideList(item,callback) {
    let obj = await axios({
        method: "POST",
        url: '/appConfig/createArouselImg',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {},
        data:{
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
        type: ADD_SLIDE_LIST,
        data: obj.data
    }
    callback(action)
}



//修改轮播图
export async function changeSlideList(item, callback) {
    let obj = await axios({
        method: "POST",
        url: '/appConfig/update',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {},
        data: {
            id:item.id,
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
        type: CHANGE_SLIDE_LIST,
        data: obj.data
    }
    callback(action)
}




//删除轮播图
export async function removeSlideList(item, callback) {
    let obj = await axios({
        method: "POST",
        url: '/appConfig/remove',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {
            id:item
        },
    
    })
    console.log(obj)
    let action = {
        type: REMOVE_SLIDE_LIST,
        data: obj.data
    }
    callback(action)
}