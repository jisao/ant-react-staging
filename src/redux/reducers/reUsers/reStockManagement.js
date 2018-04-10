import { GET_STOCK_LIST, ADD_STACK, REMOVE_STACK, SEARCH_STOCK_LIST } from "../../actions/acUsers/acStockManagement";

const list = [];

function stockManagement(state = list, action) {
    switch (action.type) {
        case GET_STOCK_LIST:
            return action.data;
        case ADD_STACK:
            return action.data;
        case REMOVE_STACK:
            return action.data;
        case SEARCH_STOCK_LIST:
            return action.data;
        default:
            return state;
    }
}


export default stockManagement