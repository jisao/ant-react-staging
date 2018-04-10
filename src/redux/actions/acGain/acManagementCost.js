import axios from 'axios'

export const GIT_PTDEPOSIT_LIST = "GIT_PTDEPOSIT_LIST"
export const GIT_GLF_LIST = "GIT_GLF_LIST"
export const GIT_SXF_LIST = "GIT_SXF_LIST"
export const TIXIAN_LIST = "TIXIAN_LIST"
export const ZZYTIXIAN_LIST = "ZZYTIXIAN_LIST"





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

//获取每个账户的管理费列表
export async function getGLFList(pageNum, pageSize, stockAccountId,state, callback) {
    let obj = await axios({
        method: "POST",
        url: '/managefee/queryManageFeeList',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {
            stockAccountId,
            pageNum,
            pageSize,
            state
        }
    })
    // console.log('getJiuPaiList',obj)
    let action = {
        type: GIT_GLF_LIST,
        data: obj.data
    }
    callback(action)
}
//获取每个账户的手续费提取历史列表
export async function getSXFList(pageNum, pageSize, stockAccountId, callback) {
    let obj = await axios({
        method: "POST",
        url: '/managefee/queryManageFeeHistory',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {
            stockAccountId,
            pageNum,
            pageSize
        }
    })
    // console.log('getJiuPaiList',obj)
    let action = {
        type: GIT_SXF_LIST,
        data: obj.data
    }
    callback(action)
}
//zzy确定
export async function zzytixianList(ids, callback) {
    console.log(ids)
    let obj = await axios({
        method: "POST",
        url: '/managefee/managerFeeZZY',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        data: {
            ids
        }
    })
    let action = {
        type: ZZYTIXIAN_LIST,
        data: obj.data
    }
    callback(action)
}
//确定
export async function tixianList(ids, callback) {
    console.log(ids)
    let obj = await axios({
        method: "POST",
        url: '/managefee/withDrawManageFee',
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