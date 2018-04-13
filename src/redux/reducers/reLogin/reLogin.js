const list = false;

import {LOGIN_SUCCESS} from '../../actions/acLogin/acLogin'

function loginSys(state = list, action) {
    console.log(action);
    switch (action.type) {
        case LOGIN_SUCCESS:
            return action.data;
        default:
            return state
    }
}

export {
    loginSys
}