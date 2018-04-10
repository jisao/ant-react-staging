import { GET_SLIDE_LIST, ADD_SLIDE_LIST, CHANGE_SLIDE_LIST, REMOVE_SLIDE_LIST } from "../../actions/acApp/acSlide";

const list = [];

function slideList(state = list, action) {
    switch (action.type) {
        case GET_SLIDE_LIST:
            return action.data
        case ADD_SLIDE_LIST:
            return action.data
        case CHANGE_SLIDE_LIST:
            return action.data
        case REMOVE_SLIDE_LIST:
            return action.data
        default:
            return state;
    }
}


export default slideList