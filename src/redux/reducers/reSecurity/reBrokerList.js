import { GET_BROKER_LIST } from "../../actions/acSecurity/acBrokerList";

const list = [];

function brokerList(state = list, action) {
    switch (action.type) {
        case GET_BROKER_LIST:
            return action.data
        default:
            return state;
    }
}


export default brokerList