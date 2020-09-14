import axios from "axios";


import {
    SET_DAILY_GOAL,
    GET_DAILY_GOAL,
    MOUNT_UNIT_OBJ,
    ARCHIVE_CURRENT,
    MOUNT_UNIT_NAME
} from './types'




// 设置该日常
export const setDailyGoal = (goal) => dispatch => {

    console.log(SET_DAILY_GOAL)
    console.log(`Goal' ${goal} Minutes`)
    dispatch({
        type: SET_DAILY_GOAL,
        payload: goal
    })
}

// 绑定当前这个单元的JSON Obj到store当中
export const mountUnitObj = (unit_obj) => dispatch => {
    console.log(MOUNT_UNIT_OBJ)
    console.log(unit_obj)
    dispatch({
        type: MOUNT_UNIT_OBJ,
        payload: unit_obj
    })
}

// 把这个单元的名字传入store
export const mountUnitName = (unit_name) => dispatch => {
    console.log(MOUNT_UNIT_NAME)
    console.log(unit_name)
    dispatch({
        type: MOUNT_UNIT_NAME,
        payload: unit_name
    })
}


// 存档当前的这个Obj
export const archiveCurrent = (current_obj) => dispatch => {
    console.log(ARCHIVE_CURRENT)
    console.log(current_obj)
    dispatch({
        type: ARCHIVE_CURRENT,
        payload: current_obj
    })
}


// 每日任务的Config
export const getDailyGoal = (user_email) => dispatch => {
      
    return axios.get(`${process.env.REACT_APP_EXPRESS_ENDPOINT}/${user_email}`)
    .then(({ data }) => {
       console.log(data)
       dispatch({
           type : GET_DAILY_GOAL,
           payload: {
               home_owner_map_config_step : data,
           }
       })
   });
}


// // 每日任务的Config
// export const getDailyGoal = ({word_obj,word_id}) => dispatch => {

//     dispatch({
//         type: GET_DAILY_GOAL,
//         payload: {
//             word_obj : word_obj,
//             word_id : word_id
//         }
//     })
// }
