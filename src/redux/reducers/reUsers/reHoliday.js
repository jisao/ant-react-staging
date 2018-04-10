import {GET_HOLIDAY_LIST,REMOVE_HOLIDAY,ADD_HOLIDAY,CHANGE_HOLIDAY } from "../../actions/acUsers/acHoliday";

const list = [];


function holidayManage(state = list,action) {
    switch (action.type) {
        case GET_HOLIDAY_LIST:
            return action.data;
        case REMOVE_HOLIDAY:
            return action.data;
        case ADD_HOLIDAY:
            return action.data;
        case CHANGE_HOLIDAY:
            return action.data;
        default:
            return state;
    }

}


export default holidayManage