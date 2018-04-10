import axios from 'axios'

export const GET_CHANNEL_CHECKING_LIST = "GET_CHANNEL_CHECKING_LIST"
export const SEARCH_CHANNEL_CHECKING_LIST = "SEARCH_CHANNEL_CHECKING_LIST"
export const COMFIRE_LIST = "COMFIRE_LIST"


//获取

export async function getChannelCheckingList(pageNo,pageSize,callback) {
    let obj = await axios({
        method: "POST",
        url: '/check/channel/query',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {
            pageNo: pageNo,
            pageSize: pageSize
        }
    })
    // console.log(obj)
    let action = {
        type: GET_CHANNEL_CHECKING_LIST,
        data: obj.data
    }
    callback(action)
}

//查询
export async function searchChannelCheckingList(pageNo, pageSize,item, callback) {
    let obj = await axios({
        method: "POST",
        url: '/check/channel/query',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {
            pageNo: pageNo,
            pageSize: pageSize,
            start:item.start,
            end:item.end,
            state:item.state == " "? null:item.state
        }
    })
    // console.log(obj)
    let action = {
        type: SEARCH_CHANNEL_CHECKING_LIST,
        data: obj.data
    }
    callback(action)
}


//确认
export async function comfireList(id, callback) {
    let obj = await axios({
        method: "POST",
        url: '/check/channel/comfire',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {
            id
        }
    })
    // console.log(obj)
    let action = {
        type: COMFIRE_LIST,
        data: obj.data
    }
    callback(action)
}
