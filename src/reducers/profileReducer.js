// 用于http协议下提交，抓取的库
import axios from "axios";

import {
    SET_DAILY_GOAL,
    MOUNT_UNIT_OBJ,
    ARCHIVE_CURRENT
} from '../actions/types'

// 导入单元
var essential_french_JSON = require('../Data/essential_french.json')
var german_demo_JSON = require('../Data/german_demo.json')

const curriculum = {
    'Essential French': essential_french_JSON,
    'German Demo': german_demo_JSON,
}


const initialState = {
    daily_goal : 15,
    archived_obj : [],
    mounted_unit_name : null
}

export default function (state = initialState, action) {

    switch (action.type) {

        // 负责将每日任务提交到服务器
        case SET_DAILY_GOAL : {
            console.log(action.payload)
            console.log(SET_DAILY_GOAL)

            axios.post(`${process.env.REACT_APP_EXPRESS_ENDPOINT}/upDateDailyGoal`,
            {user_email : action.payload.user_email,
             daily_goal : action.payload.daily_goal
            })
            
            // Map status (step)
            return { 
                ...state,
                home_owner_map_config_step: action.payload.home_owner_map_config_step
            };
        }

        // 负责加载目标词单
        case MOUNT_UNIT_OBJ : {
            console.log(action.payload)
            console.log(MOUNT_UNIT_OBJ)

            let unit_name = action.payload
            
            console.log(`mounted_unit_name: ${unit_name}`)
            console.log(curriculum[unit_name][unit_name])
            // 纯一级Object（一个key对应一个value的元组）
            let mounted_unit_obj = curriculum[unit_name][unit_name]
            return { 
                ...state,
                mounted_unit_obj : mounted_unit_obj,
                // 找出为什么是个数组
                // console.log 出来的是string
                mounted_unit_name : unit_name[0]
            };
            
        }
        
        case ARCHIVE_CURRENT : {
            console.log(action.payload)
            console.log(ARCHIVE_CURRENT)
            let current_obj = action.payload
            console.log('current_obj')
            console.log(current_obj)
            return{
                ...state,
                // 放进去成数组
                archived_obj : [...state.archived_obj,current_obj]
            }
        }

        
        

        default:
            return state;

    }
}
