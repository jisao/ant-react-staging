const list = [];



import { GET_ROLE_LIST, REMOVE_ROLE, CHANGE_ROLE, ADD_ROLE, GET_ROLE_RESOURCE, CHANGE_ROLE_RESOURCE } from "../../actions/acUsers/acRole";
import { GET_RESOURCE_LIST } from "../../actions/acUsers/acResource";

function roleManage(state = list, action) {
    switch (action.type) {
        case GET_ROLE_LIST:
            return action.data
        case REMOVE_ROLE:
            return action.data
        case CHANGE_ROLE:
            return action.data
        case ADD_ROLE:
            return action.data
        case GET_ROLE_RESOURCE:
            return action.data
        case GET_RESOURCE_LIST:
            return action.data
        case CHANGE_ROLE_RESOURCE:
            return action.data
        default:
            return state;
    }
}


export default roleManage