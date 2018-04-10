import axios from 'axios'

export const GET_EXCEKTASK_LIST = "GET_EXCEKTASK_LIST"


//获取列表
export async function getExcelTaskList(callback) {
    let obj = await axios({
        method: "POST",
        url: '/excel/query',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {}
    })
    let action = {
        type: GET_EXCEKTASK_LIST,
        data: obj.data
    }
    callback(action)
}

