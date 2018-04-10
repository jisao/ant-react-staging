import axios from 'axios'

export const GET_CONNECTION_MANAGER = "GET_CONNECTION_MANAGER"


//获取连接管理列表
export async function getConnectionManager(callback) {
    let obj = await axios({
        method: "POST",
        url: '/bondorg/queryConnect',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {}
    })
    console.log(obj)
    let action = {
        type: GET_CONNECTION_MANAGER,
        data: obj.data
    }
    callback(action)
}