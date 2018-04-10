import axios from 'axios'
import { CHECK_LOG_LIST } from './acFundingAccount';

export const GEI_PEIZACCOUNT_LIST = "GEI_PEIZACCOUNT_LIST"
export const GEI_CHECKPEIZ_LIST = "GEI_CHECKPEIZ_LIST"
export const GEI_CHANGEPEIZ_LIST = "GEI_CHANGEPEIZ_LIST"
export const CHECK_LOG_LIST1 = "CHECK_LOG_LIST1"


//获取证券账户列表
export async function getPeiZAccountList(pageNum,pageSize,mobile,personAccount,uid,callback){
    let obj = await axios({
        method:"POST",
        url:'/account/query',
        headers:{
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params:{
            pageNum,
            pageSize,
            mobile,
            personAccount,
            uid
        }
    })
    // console.log(obj)
    let action = {
        type:GEI_PEIZACCOUNT_LIST,
        data:obj.data
    }
    callback(action)
}
//获取单个配资情况
export async function getcheckPeiZ(uid,callback){
    let obj = await axios({
        method:"POST",
        url:'/account/queryPerson',
        headers:{
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params:{
          uid
        }
    })
    // console.log(obj)
    let action = {
        type:GEI_CHECKPEIZ_LIST,
        data:obj.data
    }
    callback(action)
}
//更新配资情况
export async function changePeiZ(configs,uid,callback){
    let obj = await axios({
        method:"POST",
        url:'/account/createConfig',
        headers:{
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params:{
            configs:JSON.stringify(configs),
            uid
        }
    })
    console.log(obj)
    let action = {
        type:GEI_CHANGEPEIZ_LIST,
        data:obj.data
    }
    callback(action)
}
//登录日志
export async function checkLogList(account,loginSystem,pageNum,pageSize,callback) {
    let obj = await axios({
        method: "POST",
        url: '/account/loginInfo',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {
            account,
            loginSystem,
            pageNum,
            pageSize
        }
    })
    // console.log(obj)
    let action = {
        type: CHECK_LOG_LIST1,
        data: obj.data
    }
    callback(action)
}