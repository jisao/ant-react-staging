import { GET_USERS_LIST, GET_ROLE_LIST, ADD_USERS, REMOVE_USERS, CHANGE_USERS, GET_USER_ROLE, SEARCH_USERS_LIST } from "../../actions/acUsers/acUsers";

const list = [];

function usersManage(state = list,action) {
    switch (action.type) {
        case GET_USERS_LIST:
            return action.data;
        case GET_ROLE_LIST:
            return action.data;
        case ADD_USERS:
            return action.data;
        case REMOVE_USERS:
            return action.data;
        case CHANGE_USERS:
            return action.data;
        case GET_USER_ROLE:
            return action.data;
        case SEARCH_USERS_LIST:
            return action.data;
        default:

            return state;
    }
}


export default usersManage