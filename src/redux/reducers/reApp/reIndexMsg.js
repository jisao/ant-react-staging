import { GET_INDEX_MSG, ADD_INDEX_MSG, CHANGE_INDEX_MSG, REMOVE_INDEX_MSG } from "../../actions/acApp/acIndexMsg";

const list = [];

function indexMsg(state = list, action) {
    switch (action.type) {
        case GET_INDEX_MSG:
            return action.data
        case ADD_INDEX_MSG:
            return action.data
        case CHANGE_INDEX_MSG:
            return action.data
        case REMOVE_INDEX_MSG:
            return action.data
        default:
            return state;
    }
}


export default indexMsg