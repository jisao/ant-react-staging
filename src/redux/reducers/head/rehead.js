import { LOGOUT,CHANGE_PWD } from "../../actions/head/achead";
const list = []

function userLogOut(state = list, action) {
    switch (action.type) {
        case LOGOUT:
            return action.data;
        case CHANGE_PWD:
            return action.data;
        default:
            return state
    }

}
export default userLogOut