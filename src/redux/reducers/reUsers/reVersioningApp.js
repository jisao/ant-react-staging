import { GET_VERSIONINGAPP_LIST, ADD_VERSIONINGAPP, CHANGE_VERSIONINGAPP, REMOVE_VERSIONINGAPP } from "../../actions/acUsers/acVersioningApp";

const list = [];

function versioningAppManage(state = list, action) {
    switch (action.type) {
        case GET_VERSIONINGAPP_LIST:
            return action.data;

        case ADD_VERSIONINGAPP:
            return action.data;

        case CHANGE_VERSIONINGAPP:
            return action.data;
            
        case REMOVE_VERSIONINGAPP:
            return action.data;

        default:
            return state;
    }
}


export default versioningAppManage