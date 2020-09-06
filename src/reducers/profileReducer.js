import axios from "axios";

import {
    SET_DAILY_GOAL,
    MOUNT_UNIT_OBJ
} from '../actions/types'

var essential_french_JSON = require('../Data/essential_french.json')


const curriculum = {
    'Essential French': essential_french_JSON,
}


const initialState = {
    daily_goal : 15
}

export default function (state = initialState, action) {

    switch (action.type) {


        case SET_DAILY_GOAL : {
            console.log(action.payload)
            console.log(SET_DAILY_GOAL)

            axios.post(`${process.env.REACT_APP_EXPRESS_ENDPOINT}/HomeOwnerMapSteps`,
            {user_email : action.payload.user_email,
             daily_goal : action.payload.daily_goal
            })
            
            // Map status (step)
            return { 
                ...state,
                home_owner_map_config_step: action.payload.home_owner_map_config_step
            };
        }

        case MOUNT_UNIT_OBJ : {
            console.log(action.payload)
            console.log(MOUNT_UNIT_OBJ)

            let unit = action.payload
            // let unit_obj = 
            console.log(`unit： ${unit}`)
            console.log(curriculum[unit][unit])
            let mounted_unit_obj = curriculum[unit][unit]
            return { 
                ...state,
                mounted_unit_obj: mounted_unit_obj
            };
 
        }
        

        default:
            return state;

    }
}
