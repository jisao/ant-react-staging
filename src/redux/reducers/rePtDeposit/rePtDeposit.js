import { GIT_PTDEPOSIT_LIST, GIT_JIUPAI_LIST, GIT_YINZZ_LIST, JIUPAI_TO_BANK_LIST, YINZZ_TO_BOND_LIST, GIT_YINZZHISTROY_LIST,GIT_JIUPAIDR_LIST } from "../../actions/acPtDeposit/acPtDeposit";

const list = [];

function ptDepositManage(state = list, action) {
    switch (action.type) {
        case GIT_PTDEPOSIT_LIST:
            return action.data;
        case GIT_JIUPAI_LIST:
            return action.data;
        case GIT_YINZZ_LIST:
            return action.data;
        case JIUPAI_TO_BANK_LIST:
            return action.data;
        case YINZZ_TO_BOND_LIST:
            return action.data;
        case GIT_YINZZHISTROY_LIST:
            return action.data;
        case GIT_JIUPAIDR_LIST:
            return action.data;
        default:
            return state;
    }
}


export default ptDepositManage