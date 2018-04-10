import { GET_REVIEWSTEPS_LIST, GET_ROLE_LIST, ADD_REVIEWSTEPS_LIST, CHANGE_REVIEWSTEPS_LIST, REMOVE_REVIEWSTEPS_LIST } from "../../actions/acReviewSteps/acReviewSteps";

const list = [];

function reviewStepManage(state = list, action) {
    switch (action.type) {
        case GET_REVIEWSTEPS_LIST:
            return action.data;
        case GET_ROLE_LIST:
            return action.data;
        case ADD_REVIEWSTEPS_LIST:
            return action.data;
        case CHANGE_REVIEWSTEPS_LIST:
            return action.data;
        case REMOVE_REVIEWSTEPS_LIST:
            return action.data;

 

        default:
            return state;
    }
}


export default reviewStepManage