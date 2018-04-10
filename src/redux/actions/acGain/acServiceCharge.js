import axios from 'axios'

export const GIT_PTDEPOSIT_LIST = "GIT_PTDEPOSIT_LIST"
export const GIT_GLF_LIST = "GIT_GLF_LIST"
export const GIT_SXF_LIST = "GIT_SXF_LIST"
export const TIXIAN_LIST = "TIXIAN_LIST"//
export const GIT_TX_LIST = "GIT_TX_LIST"//中间步骤和上面区分
export const TX_LIST = "TX_LIST"//中间步骤和上面区分
export const ADD_EXCEL = "ADD_EXCEL"





//这个函数是获取账户数据
export async function getPtDepositList(callback) {
    let obj = await axios({
        method: "POST",
        url: '/bondaccount/queryBondAccount',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {
        }
    })
    // console.log(obj)
    let action = {
        type: GIT_PTDEPOSIT_LIST,
        data: obj.data
    }
    callback(action)
}



//获取每个账户的手续费列表
export async function getGLFList(pageNum, pageSize, stockAccountId,glfItem,callback) {
    let obj = await axios({
        method: "POST",
        url: '/poundage/queryPoundageList',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        data: {
            stockAccountId,
            pageNum,
            pageSize,
            account :glfItem.account ,
            phone : glfItem.phone,
            startTime : glfItem.startTime,
            endTime : glfItem.endTime
        }
    })
    // console.log('getJiuPaiList',obj)
    let action = {
        type: GIT_GLF_LIST,
        data: obj.data
    }
    callback(action)
}
//获取每个账户 提现 列表  中间步骤
export async function getTXList(pageNum, pageSize, stockAccountId,txItem, callback) {
    let obj = await axios({
        method: "POST",
        url: '/poundage/queryPoundageWithdrawList',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        data: {
            stockAccountId,
            pageNum,
            pageSize,
            account :txItem.account ,
            phone : txItem.phone,
            startTime : txItem.startTime,
            endTime : txItem.endTime
        }
    })
    // console.log('getJiuPaiList',obj)
    let action = {
        type: GIT_TX_LIST,
        data: obj.data
    }
    callback(action)
}
//获取每个账户的手续费提取历史列表
export async function getSXFList(pageNum, pageSize, stockAccountId,sxfItem, callback) {
    let obj = await axios({
        method: "POST",
        url: '/poundage/queryPoundageHistory',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        data: {
            stockAccountId,
            pageNum,
            pageSize,
            account :sxfItem.account ,
            phone : sxfItem.phone,
            startTime : sxfItem.startTime,
            endTime : sxfItem.endTime
        }
    })
    // console.log('getJiuPaiList',obj)
    let action = {
        type: GIT_SXF_LIST,
        data: obj.data
    }
    callback(action)
}



//  中间步骤的确定
export async function txList(ids, callback) {
    console.log(ids)
    let obj = await axios({
        method: "POST",
        url: '/poundage/withDrawPoundageOut',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        data: {
            ids
        }
    })
    let action = {
        type: TX_LIST,
        data: obj.data
    }
    callback(action)
}
//最后一步的提现
export async function tixianList(ids, callback) {
    let obj = await axios({
        method: "POST",
        url: '/poundage/withDrawPoundage',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        data: {
            ids
        }
    })
    let action = {
        type: TIXIAN_LIST,
        data: obj.data
    }
    callback(action)
}
//EXCEL
export async function addExcel(item, callback) {
    let obj = await axios({
        method: "POST",
        url: '/poundage/createPoundageExcel',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        data: {
            stockAccountId:item.stockAccountId,
            startTime:item.startTime,
            endTime:item.endTime,
            phone:item.phone,
            phone:item.phone,
            withState:item.withState,
        }
    })
    console.log(obj)
    let action = {
        type: ADD_EXCEL,
        data: obj.data
    }
    callback(action)
}