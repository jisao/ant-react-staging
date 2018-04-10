import axios from 'axios'

export const GIT_PTDEPOSIT_LIST = "GIT_PTDEPOSIT_LIST"
export const GIT_JIUPAI_LIST = "GIT_JIUPAI_LIST"
export const GIT_YINZZ_LIST = "GIT_YINZZ_LIST"
export const JIUPAI_TO_BANK_LIST = "JIUPAI_TO_BANK_LIST"
export const YINZZ_TO_BOND_LIST = "YINZZ_TO_BOND_LIST"
export const GIT_YINZZHISTROY_LIST = "GIT_YINZZHISTROY_LIST"
export const GIT_JIUPAIDR_LIST = "GIT_JIUPAIDR_LIST"




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
//九派垫付列表
export async function getJiuPaiList(pageNum,pageSize,stockAccountId,callback) {
    let obj = await axios({
        method: "POST",
        url: '/pltbz/queryJiuPaiDFList',
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
        type: GIT_JIUPAI_LIST,
        data: obj.data
    }
    callback(action)
}
//九派当日垫付列表
export async function getJiuPaiDRList(pageNum,pageSize,stockAccountId,callback) {
    let obj = await axios({
        method: "POST",
        url: '/pltbz/queryToDayJiuPaiDFList',
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
        type: GIT_JIUPAIDR_LIST,
        data: obj.data
    }
    callback(action)
}
//银转证列表
export async function getYinZZList(pageNum,pageSize,stockAccountId,callback) {
    let obj = await axios({
        method: "POST",
        url: '/pltbz/queryToBankList',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {
            stockAccountId,
            pageNum,
            pageSize
        }
    })
    // console.log('getYinZZList',obj)
    let action = {
        type: GIT_YINZZ_LIST,
        data: obj.data
    }
    callback(action)
}
//银转证历史列表
export async function getYinZZHistroyList(pageNum,pageSize,stockAccountId,callback) {
    let obj = await axios({
        method: "POST",
        url: '/pltbz/queryBankToBondList',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {
            stockAccountId,
            pageNum,
            pageSize
        }
    })
    // console.log('getYinZZList',obj)
    let action = {
        type: GIT_YINZZHISTROY_LIST,
        data: obj.data
    }
    callback(action)
}
//九派转银行卡确定
export async function jiupaiToBankList(ids,callback) {
    let obj = await axios({
        method: "POST",
        url: '/pltbz/jiuPaiToBank',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        data: {
            ids
        }
    })
    console.log('getYinZZList',obj)
    let action = {
        type: JIUPAI_TO_BANK_LIST,
        data: obj.data
    }
    callback(action)
}
//银转证确定
export async function yinZZToBondList(ids,callback) {
    let obj = await axios({
        method: "POST",
        url: '/pltbz/bankToBond',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        data: {
            ids
        }
    })
    console.log('getYinZZList',obj)
    let action = {
        type: YINZZ_TO_BOND_LIST,
        data: obj.data
    }
    callback(action)
}

