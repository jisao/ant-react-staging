import axios from "axios"

export const GET_CP_DETAILS = "GET_CP_DETAILS"
export const GET_FUNDING_ORDER_DETAILS = "GET_FUNDING_ORDER_DETAILS"
export const CLICK_NEXT_STEP = "CLICK_NEXT_STEP"

//查询订单流程
export async function getCheckPendingDetails({ instanceId }, callback) {
    let obj = await axios({
        method: "POST",
        url: "/flow/query",

        params: {
            instanceId,
        },
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
    })
    let action = {
        type: GET_CP_DETAILS,
        obj: obj.data
    }
    callback(action)
}

//查询配资订单详情
export async function getFundingOrderDetails(id, url,callback) {
    console.log("请求详情数据发送的id",id);
    let obj = await axios({
        method: "POST",
        url,

        params: {
           id
        },
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
    })
    let action = {
        type: GET_FUNDING_ORDER_DETAILS,
        obj: obj.data
    }
    callback(action)
}

//点击下一步获取的信息
export async function clickNextStep({ step, instanceId, content, imgs, url }, callback) {
    console.log("修改备注发送的请求数据",step, instanceId, content, imgs, url);
    let obj = await axios({
        method: "POST",
        url,
        params: {
            instanceId,
            content,
            step,
        },
        data: {
            imgs
        },
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
    })
    let action = {
        type: CLICK_NEXT_STEP,
        obj: obj.data
    }
    callback(action)
}