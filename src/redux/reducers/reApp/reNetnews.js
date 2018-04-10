const list = [];



import { GET_NETNEWS_LIST,GET_NETNEWS_LIST1,ADD_NETNEWS_LIST,ADD_NETNEWS_LIST1,CHANGE_NETNEWS_LIST ,CHANGE_NETNEWS_LIST1,REMOVE_NETNEWS_LIST } from "../../actions/acApp/acNetnews";

function netnewsList(state = list, action) {
    switch (action.type) {
        case GET_NETNEWS_LIST:
            return action.data
        case GET_NETNEWS_LIST1:
            return action.data
        case ADD_NETNEWS_LIST:
            return action.data
        case ADD_NETNEWS_LIST1:
            return action.data
        case CHANGE_NETNEWS_LIST:
            return action.data
        case CHANGE_NETNEWS_LIST1:
            return action.data
        case REMOVE_NETNEWS_LIST:
            return action.data
        default:
            return state;
    }
}


export default netnewsList