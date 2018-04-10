import axios from 'axios'


export const ADD_HOLIDAY = "ADD_HOLIDAY"
export const REMOVE_HOLIDAY = "REMOVE_HOLIDAY"
export const GET_HOLIDAY_LIST = "GET_HOLIDAY_LIST"
export const CHANGE_HOLIDAY = "CHNAGE_HOLIDAY"

//这个函数是获取假日数据
export async function getholidayList(current, pageSize, callback){
    let obj = await axios({
        method: "POST",
        url: '/holiday/getHolidayList',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {
            pageNo: current,
            pageSize: pageSize,
        }
    })
    console.log(obj)
    let action = {
        type: GET_HOLIDAY_LIST,
        data: obj.data.data
        // msg: obj.data.message
    }
    callback(action)
}

//新增假期请求
export async function addHoliday(data, callback) {
    console.log(data)
    let obj = await axios({
        method: "POST",
        url: 'holiday/createHoliday',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {
            day: data
        }
    })
    console.log(obj)
    let action = {
        type: ADD_HOLIDAY,
        data: obj
    }
    callback(action)
}

//假期删除
export async function removeHoliday(data, callback) {
    let obj = await axios({
        method: "POST",
        url: '/holiday/removeHoliday',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {
            id:data
        }
    })
    let action = {
        type: REMOVE_HOLIDAY,
        data: obj
    }
    callback(action)
}

//修改假期
export async function changeHoliday(data, callback) {

    let obj = await axios({
        method: "POST",
        url: '/manager/updateHoliday',
        headers: {
            accessKey: JSON.parse(sessionStorage.item).data.accessKey
        },
        params: {
            day: data.day,
            id: data.id
        }
    })
    console.log(data)
    console.log(obj)
    let action = {
        type: CHANGE_HOLIDAY,
        data: obj
    }
    callback(action)
}