export const USER_POSITION = "USER_POSITION"



export  function getUserPositon(callback) {
    console.log(sessionStorage.item)
    let action = {
        type: USER_POSITION,
        data: ''
    }
    callback(action)
}