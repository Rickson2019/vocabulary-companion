import axios from "axios";


import {
    SET_DAILY_GOAL,
    GET_DAILY_GOAL,
    MOUNT_UNIT_OBJ_LOCAL,
    ARCHIVE_CURRENT,
    MOUNT_UNIT_NAME,
    FETCH_USER_STUDY_RECORD,
    UPDATE_USER_STUDY_RECORD,
    UPDATE_STUDY_TASK,
    LOAD_20_WORDS
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


// TODO: Load 20 words at a time

export const load20Words = (unit_name) => dispatch => {
    console.log(LOAD_20_WORDS)
    let mounted_words = dispatch

    dispatch({
        type: LOAD_20_WORDS,
        payload: mounted_words
    })

}


// 绑定当前这个单元的JSON Obj到store当中
export const mountUnitObjLocal = (unit_name) => dispatch => {
    console.log(MOUNT_UNIT_OBJ_LOCAL)
    console.log(unit_name)
    dispatch({
        type: MOUNT_UNIT_OBJ_LOCAL,
        payload: unit_name
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

// // 绑定当前这个单元的JSON Obj到store当中
// export const mountUnitObjLocalByName = (unit_obj) => dispatch => {
//     console.log(MOUNT_UNIT_OBJ_LOCAL)
//     console.log(unit_obj)
//     dispatch({
//         type: MOUNT_UNIT_OBJ_LOCAL,
//         payload: unit_obj
//     })
// }




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
                type: GET_DAILY_GOAL,
                payload: {
                    home_owner_map_config_step: data,
                }
            })
        });
}

// 获取用户的学习记录
export const fetchUserStudyRecord = (user_email) => dispatch => {
    console.log('fetchUserStudyRecord');
    console.log(user_email);

    return axios.post(`${process.env.REACT_APP_EXPRESS_ENDPOINT}/fetch_user_study_record_by_email`, {
        user_email: user_email
    })
        .then(({ data }) => {
            console.log(data);
            dispatch({
                type: FETCH_USER_STUDY_RECORD,
                payload: {
                    user_study_record: data
                }
            })
        })
}

// 需要把mounted的object减去用户的学习进度
// 然后把他设为新的mounted
// 记录斩掉的单词 操作在redux中进行比较好
export const updateStudyTask = (user_email, word_just_learned, wordlist_name) => dispatch => {
    console.log('updateStudyTask');
    console.log(user_email);
    console.log(wordlist_name)

    dispatch({
        type: UPDATE_STUDY_TASK,
        payload: {
            user_email: user_email,
            word_just_learned: word_just_learned,
            wordlist_name: wordlist_name
        }
    })
}


/*
    需要比较的变量：

    1. 用户已学的单词
    2. 用户还未学习的单词
 */
export const updateUserStudyRecord = (user_email) => dispatch => {
    console.log('updateUserStudyRecord')
    console.log()

    dispatch({
        type: UPDATE_USER_STUDY_RECORD,
        payload: {
            user_email: user_email
        }
    })
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
