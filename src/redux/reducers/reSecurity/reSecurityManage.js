import { GET_SECURITY_MANAGE, ADD_AMOUNT,  } from "../../actions/acSecurity/acSecurityManage";

const list = [];

function securityManage(state = list, action) {
    switch (action.type) {
        case GET_SECURITY_MANAGE:
            return action.data
        case ADD_AMOUNT:
            return action.data
        default:
            return state;
    }
}


export default securityManage