const list = [];



import { USER_LOGIN, LOGIN_IN } from "../../actions/acLogin/acLogin";

function userLoginList(state = list, action) {
    switch (action.type) {
        case USER_LOGIN:
        return action.data
        case LOGIN_IN:
            return action.data
        default:

            return state;
    }
}


export default userLoginList