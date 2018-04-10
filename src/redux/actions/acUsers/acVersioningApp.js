import axios from 'axios'

export const GET_VERSIONINGAPP_LIST = "GET_VERSIONINGAPP_LIST"
export const ADD_VERSIONINGAPP = "ADD_VERSIONINGAPP"
export const CHANGE_VERSIONINGAPP = "CHANGE_VERSIONINGAPP"
export const REMOVE_VERSIONINGAPP = "REMOVE_VERSIONINGAPP"


//获取全部list
export async function getVersioningAppList(callback) {
    let obj = await axios({
        method: "POST",
        url: '/version/query',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {}
    })
    // console.log(obj)
    let action = {

        type: GET_VERSIONINGAPP_LIST,
        data: obj.data
    }
    callback(action)
}


//添加
export async function addVersioningApp(item,callback) {
    let obj = await axios({
        method: "POST",
        url: '/version/create',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params:{

        },
        data: {
            // appName: item.appName,
            versionName: item.versionName,
            versionNo: item.versionNo,
            fileUrl: item.fileUrl,
            versionNote: item.versionNote,
            forced: item.forced,
            appType: item.type,
        }
    })
    console.log(obj)
    let action = {

        type: ADD_VERSIONINGAPP,
        data: obj.data
    }
    callback(action)
}



//修改
export async function changeVersioningApp(item, callback) {
    let obj = await axios({
        method: "POST",
        url: '/version/update',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {

        },
        data: {
            id:item.id,
            // appName: item.appName,
            versionName: item.versionName,
            versionNo: item.versionNo,
            fileUrl: item.fileUrl,
            versionNote: item.versionNote,
            forced: item.forced,
            appType: item.type,
        }
    })
    console.log(obj)
    let action = {

        type: CHANGE_VERSIONINGAPP,
        data: obj.data
    }
    callback(action)
}

export async function removeVersioningApp(item, callback) {
    let obj = await axios({
        method: "POST",
        url: '/version/remove',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {
            id:item
        },
    
    })
    console.log(obj)
    let action = {
        type: REMOVE_VERSIONINGAPP,
        data: obj.data
    }
    callback(action)
}