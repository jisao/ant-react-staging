import { GET_CONNECTION_MANAGER } from "../../actions/acFunding/acConnectionManager";

const list = [];

function connectionManager(state = list, action) {
    switch (action.type) {
        case GET_CONNECTION_MANAGER:
            return action.data
        default:
            return state;
    }
}


export default connectionManager