import axios from 'axios'

export const GET_SECURITY_MANAGE = "GET_SECURITY_MANAGE"
export const ADD_AMOUNT = "ADD_AMOUNT"


//获取证券账户列表
export async function getSecurityManage(callback){
    let obj = await axios({
        method:"POST",
        url:'/bond/capital/all',
        headers:{
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params:{}
    })
    console.log(obj)
    let action = {
        type:GET_SECURITY_MANAGE,
        data:obj.data
    }
    callback(action)
}
//追加资金池
export async function addAmount(id,amount,callback){
    let obj = await axios({
        method:"POST",
        url:'/bond/capital/addAmount',
        headers:{
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params:{
            id:id,
            amount: amount
        }
    })
    console.log(obj)
    let action = {
        type:ADD_AMOUNT,
        data:obj.data
    }
    callback(action)
}