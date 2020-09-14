// 用于http协议下提交，抓取的库
import axios from "axios";


import {
    UPDATE_WORD_INFO
} from '../actions/types'

const initialState = {
    daily_goal: 15,
    archived_obj: []
}

export default function (state = initialState, action) {

    switch (action.type) {

        // 更新词单
        case UPDATE_WORD_INFO: {
            console.log(action.payload)
            console.log(UPDATE_WORD_INFO)


            axios.post(`${process.env.REACT_APP_EXPRESS_ENDPOINT}/update_word_info_by_id`,
                {
                    word_obj : action.payload.word_obj,
                    wordlist_name : action.payload.wordlist_name
                })

            // 什么都不做
            return {
                ...state,
            };
        }

        default:
            return state;

    }
}
