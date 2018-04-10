import {GET_CP_DETAILS, CLICK_NEXT_STEP, GET_FUNDING_ORDER_DETAILS} from '../../actions/acDailiProfit/acCheckPendingDetails'

//订单所有的流程
function cpDetails(state={},action){
    switch (action.type) {
        case GET_CP_DETAILS: return action.obj
        default :return state
    }
}


//点击下一步获取的返回消息
function nextStepRes(state={}, action){
    switch (action.type) {
        case CLICK_NEXT_STEP: return action.obj
        default :return state
    }
}
//点击下一步获取的返回消息
function fundingOrderDetails(state={}, action){
    switch (action.type) {
        case GET_FUNDING_ORDER_DETAILS: return action.obj
        default :return state
    }
}


export {cpDetails, nextStepRes, fundingOrderDetails}