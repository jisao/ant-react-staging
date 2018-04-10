import axios from 'axios'

export const GET_BROKER_LIST = "GET_BROKER_LIST"


//获取证券账户列表
export async function getBrokerList(callback) {
    let obj = await axios({
        method: "POST",
        url: '/bondorg/queryBondorg',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {}
    })
    console.log(obj)
    let action = {
        type: GET_BROKER_LIST,
        data: obj.data
    }
    callback(action)
}