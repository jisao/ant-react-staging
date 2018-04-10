
//待审核状态
import { GET_CHECK_PENDING_LIST } from '../../actions/acDailiProfit/acCheckPending'

function chackPendingList(state = {}, action) {
    switch (action.type) {
        case GET_CHECK_PENDING_LIST: return action.obj
        default: return state
    }
}

export default chackPendingList