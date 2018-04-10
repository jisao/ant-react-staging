import axios from 'axios'

export const GET__FUNDING_DEPLOY = "GET__FUNDING_DEPLOY"
export const ADD_FUNDING_DEPLOY = "ADD_FUNDING_DEPLOY"
export const REMOVE_FUNDING_DEPLOY = "REMOVE_FUNDING_DEPLOY"
export const CHANGE_FUNDING_DEPLOY = "CHANGE_FUNDING_DEPLOY"

//获取连接配置列表
export async function getFundingDeploy(callback) {
    let obj = await axios({
        method: "POST",
        url: '/financeConfig/queryFinanceConfig',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {}
    })
    console.log(obj)
    let action = {
        type: GET__FUNDING_DEPLOY,
        data: obj.data
    }
    callback(action)
}


//添加配置管理
export async function addFundingDeploy(item,callback){
    console.log(item)
    let obj = await axios({
        method:"POST",
        url:'/financeConfig/createFinanceConfig',
        headers:{
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        data:{
            dangerRate: item.dangerRate,
            feeRate: item.feeRate,
            gePercent: item.gePercent,
            holdTime: item.holdTime,
            maxInput: item.maxInput,
            mbPercent: item.mbPercent,
            signalPercent: item.signalPercent,
            minInput: item.minInput,
            multiple: item.multiple,
            maxPrestore: item.maxPrestore,
            minPrestore: item.minPrestore,
            stopRate: item.stopRate,
            type: item.type
        }
    })
    let action ={
        type:ADD_FUNDING_DEPLOY,
        data:obj.data
    }
    callback(action)
}

//删除
export async function removeFundingDeploy(item,callback){
    console.log(item)
    let obj = await axios({
        method:"POST",
        url:'/financeConfig/deleteFinanceConfig',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params:{
            id:item
        }
    })
    console.log(obj)
    let action = {
        type:REMOVE_FUNDING_DEPLOY,
        data:obj.data
    }
    callback(action)
}
//修改
export async function changeFundingDeploy(item, callback) {
    console.log(item)
    let obj = await axios({
        method: "POST",
        url: '/financeConfig/updateFinanceConfig',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        data: {
            id:item.id,
            dangerRate: item.dangerRate,
            feeRate: item.feeRate,
            gePercent: item.gePercent,
            holdTime: item.holdTime,
            maxInput: item.maxInput,
            mbPercent: item.mbPercent,
            signalPercent: item.signalPercent,
            minInput: item.minInput,
            multiple: item.multiple,
            maxPrestore: item.maxPrestore,
            minPrestore: item.minPrestore,
            stopRate: item.stopRate,
            type: item.type
        }
    })
    console.log(obj)
    let action = {
        type: CHANGE_FUNDING_DEPLOY,
        data: obj.data
    }
    callback(action)
}