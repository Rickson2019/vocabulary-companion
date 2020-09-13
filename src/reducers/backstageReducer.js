// 用于http协议下提交，抓取的库
import axios from "axios";


import {
    UPDATE_WORD_INFO
} from '../actions/types'

const initialState = {
    daily_goal : 15,
    archived_obj : []
}