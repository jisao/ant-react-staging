import { GIT_PTDEPOSIT_LIST, GIT_GLF_LIST, GIT_SXF_LIST, TIXIAN_LIST,ZZYTIXIAN_LIST } from "../../actions/acGain/acManagementCost";

const list = [];

function serviceCharge_List(state = list, action) {
    switch (action.type) {
        case GIT_PTDEPOSIT_LIST:
            return action.data;
        case GIT_GLF_LIST:
            return action.data;
        case GIT_SXF_LIST:
            return action.data;
        case TIXIAN_LIST:
            return action.data;
        case ZZYTIXIAN_LIST:
            return action.data;
        default:
            return state;
    }
}


export default serviceCharge_List