import { GET__FUNDING_DEPLOY, ADD_FUNDING_DEPLOY, REMOVE_FUNDING_DEPLOY, CHANGE_FUNDING_DEPLOY } from "../../actions/acFunding/acFundingDeploy";

const list = [];

function fundingDeploy(state = list, action) {
    switch (action.type) {
        case GET__FUNDING_DEPLOY:
            return action.data
        case ADD_FUNDING_DEPLOY:
            return action.data
        case REMOVE_FUNDING_DEPLOY:
            return action.data
        case CHANGE_FUNDING_DEPLOY:
            return action.data
        default:
            return state;
    }
}


export default fundingDeploy