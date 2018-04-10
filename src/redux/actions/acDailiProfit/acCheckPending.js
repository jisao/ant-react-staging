import axios from 'axios'

export const GET_CHECK_PENDING_LIST = "GET_CHECK_PENDING_LIST"//定义获取待审核常量


export async function getCheckPendingList(pageNum, pageSize,url,callback) {
    let obj = await axios({
        method: "POST",
        url,
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params:{
            pageNum,
            pageSize
        }
    })
    let action = {
        type: GET_CHECK_PENDING_LIST,
        obj: obj.data
    }
    callback(action)
}
