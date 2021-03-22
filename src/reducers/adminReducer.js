// 用于http协议下提交，抓取的库
import axios from "axios";

// TODO: types
import {
    LOAD_ALL_LANGUAGE_NAMES,
    LOAD_ALL_UNITS_BY_LANGUAGE_NAME
} from '../actions/types'


const initialState = {
    all_languages_in_DB: []
}

export default function (state = initialState, action) {

    switch (action.type) {

        // 负责将每日任务提交到服务器
        case LOAD_ALL_LANGUAGE_NAMES: {

            console.log(LOAD_ALL_LANGUAGE_NAMES)
            console.log(action.payload)

            return {
                ...state,
                all_languages_in_DB: action.payload
            }


        }
        // 全部的Units
        case LOAD_ALL_UNITS_BY_LANGUAGE_NAME: {
            console.log(LOAD_ALL_UNITS_BY_LANGUAGE_NAME);
            return {
                ...state,
                wordlists_in_the_language: action.payload
            }
        }

        default:
            return state;

    }
}
