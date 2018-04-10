const list = [];



import { GET_RESOURCE_LIST, ADD_RESOURCE, CHANGE_RESOURCE, REMOVE_RESOURCE } from "../../actions/acUsers/acResource";

function resourceList(state = list, action) {
    switch (action.type) {
        case GET_RESOURCE_LIST:
            return action.data
        case ADD_RESOURCE:
            return action.data
        case CHANGE_RESOURCE:
            return action.data
        case REMOVE_RESOURCE:
            return action.data
        default:

            return state;
    }
}





export default resourceList