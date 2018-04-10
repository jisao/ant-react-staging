

import { GET_CHANNEL_CHECKING_LIST, SEARCH_CHANNEL_CHECKING_LIST, COMFIRE_LIST } from "../../actions/acCashChecking/acChannelChecking";

const list = [];

function channelCheckingManage(state = list, action) {
    switch (action.type) {

        case GET_CHANNEL_CHECKING_LIST:
            return action.data;

        case SEARCH_CHANNEL_CHECKING_LIST:
            return action.data;

        case COMFIRE_LIST:
            return action.data;

        default:

            return state;
    }
}


export default channelCheckingManage