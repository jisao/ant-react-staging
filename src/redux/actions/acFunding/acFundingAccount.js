import axios from 'axios'

export const GET_FUNDING_ACCOUNT = "GET_FUNDING_ACCOUNT"
export const CHANGE_AUTO_OUT = "CHANGE_AUTO_OUT"
export const SEARCH_FUNDING_ACCOUNT = "SEARCH_FUNDING_ACCOUNT"
export const WIN_OPEN = "WIN_OPEN"
export const ADD_EXCEL = "ADD_EXCEL"
export const CHECK_LOG_LIST = "CHECK_LOG_LIST"


//获取证券账户列表
export async function getfundingAccount(pageNum,pageSize,callback) {
    let obj = await axios({
        method: "POST",
        url: '/person/getPersonList',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {
            pageNum
        }
    })
    // console.log(obj)
    let action = {
        type: GET_FUNDING_ACCOUNT,
        data: obj.data
    }
    callback(action)
}

//查询
export async function searchfundingAccount(id,stopState,callback) {
    let obj = await axios({
        method: "POST",
        url: '/person/getPersonList',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {
            account:id,
            stopState
        }
    })
    // console.log(obj)
    let action = {
        type: SEARCH_FUNDING_ACCOUNT,
        data: obj.data
    }
    callback(action)
}

//修改是否能自动平仓
export async function changeAutoOutList(id,value,percent,callback) {
    let obj = await axios({
        method: "POST",
        url: '/person/updatePerson',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {
            id:id,
            autoOut:value,
            gePercent:  percent.gePercent,
            feePercent:  percent.feePercent,
            signalPercent:  percent.signalPercent
        }
    })
    // console.log(obj)
    let action = {
        type: CHANGE_AUTO_OUT,
        data: obj.data
    }
    callback(action)
}

//打开独立交易端
export async function winOpen(account,callback) {
    let obj = await axios({
        method: "POST",
        url: '/person/loginTrade',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {
            account
        }
    })
    // console.log(obj)
    let action = {
        type: WIN_OPEN,
        data: obj.data
    }
    callback(action)
}
//生成EXCEL
export async function addExcel(account,stopState,callback) {
    let obj = await axios({
        method: "POST",
        url: '/person/excel',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {
            account,
            stopState
        }
    })
    // console.log(obj)
    let action = {
        type: ADD_EXCEL,
        data: obj.data
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
        type: CHECK_LOG_LIST,
        data: obj.data
    }
    callback(action)
}