import { GEI_PEIZACCOUNT_LIST, GEI_CHECKPEIZ_LIST,GEI_CHANGEPEIZ_LIST,CHECK_LOG_LIST1 } from "../../actions/acFunding/acPeiZAccount";

const list = [];

function peiZAccountList(state = list, action) {
    switch (action.type) {
        case GEI_PEIZACCOUNT_LIST:
            return action.data
        case GEI_CHECKPEIZ_LIST:
            return action.data
        case GEI_CHANGEPEIZ_LIST:
            return action.data
        case CHECK_LOG_LIST1:
            return action.data
        default:
            return state;
    }
}


export default peiZAccountList