import { GIT_PTDEPOSIT_LIST, GIT_GLF_LIST, GIT_SXF_LIST, TIXIAN_LIST, GIT_TX_LIST, TX_LIST,ADD_EXCEL } from "../../actions/acGain/acServiceCharge";

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
        case GIT_TX_LIST:
            return action.data;
        case TX_LIST:
            return action.data;
        case ADD_EXCEL:
            return action.data;
        default:
            return state;
    }
}


export default serviceCharge_List