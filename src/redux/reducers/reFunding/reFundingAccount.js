import { GET_FUNDING_ACCOUNT, CHANGE_AUTO_OUT,SEARCH_FUNDING_ACCOUNT,WIN_OPEN,ADD_EXCEL,CHECK_LOG_LIST } from "../../actions/acFunding/acFundingAccount";

const list = [];

function fundingAccount(state = list, action) {
    switch (action.type) {

        case GET_FUNDING_ACCOUNT:
            return action.data
        case SEARCH_FUNDING_ACCOUNT:
            return action.data

        case CHANGE_AUTO_OUT:
            return action.data
            
        case WIN_OPEN:
            return action.data

        case ADD_EXCEL:
            return action.data

        case CHECK_LOG_LIST:
            return action.data
            
        default:
            return state;
    }
}


export default fundingAccount