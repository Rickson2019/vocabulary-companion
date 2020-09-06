import axios from "axios";

import {
    SET_DAILY_GOAL,
    GET_DAILY_GOAL,
    MOUNT_UNIT_OBJ,
    ARCHIVE_CURRENT
} from './types'




// 设置该日常
export const setDailyGoal = (goal) => dispatch => {
    
    console.log(SET_DAILY_GOAL)
    console.log(`Goal' ${goal} Minutes`)
    dispatch({
        type : SET_DAILY_GOAL,
        payload : goal
    })
}

// 绑定当前这个单元到store当中
export const mountUnitObj = (unit) => dispatch => {
    console.log(MOUNT_UNIT_OBJ)
    console.log(unit)
    dispatch({
        type : MOUNT_UNIT_OBJ,
        payload : unit
    })
}

// 存档当前的这个
export const archiveCurrent = (current_obj) => dispatch => {
    console.log(ARCHIVE_CURRENT)
    console.log(current_obj)
    dispatch({
        type : ARCHIVE_CURRENT,
        payload : current_obj
    })
}

// A temporary user's choice of being a renter/owner
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


// export const fetchHomeOwnerMapStatus = (user_email) => dispatch => {
//     console.log('fetchHomeOwnerMapStatus')
//     console.log('user_email')
//     console.log(user_email)

//         return axios.get(`${process.env.REACT_APP_EXPRESS_ENDPOINT}/HomeOwnerMapSteps/${user_email}`)
//          .then(({ data }) => {
//             console.log(data)
//             dispatch({
//                 type : FETCH_HOME_OWNER_MAP_STATUS,
//                 payload: {
//                     home_owner_map_config_step : data,
//                 }
//             })
//         });
// }


