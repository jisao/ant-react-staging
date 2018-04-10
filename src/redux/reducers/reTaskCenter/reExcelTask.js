import { GET_EXCEKTASK_LIST } from "../../actions/acTaskCenter/acExcelTask";

const list = [];

function excelTask(state = list, action) {
    switch (action.type) {
        case GET_EXCEKTASK_LIST:
            return action.data
        default:
            return state;
    }
}


export default excelTask