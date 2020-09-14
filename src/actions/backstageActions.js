import axios from "axios";

// 上传这个WORD的信息
import { UPDATE_WORD_INFO } from './types'


// 上传选中的词单名
export const updateWordInfoByID = ({ word_obj, word_id }) => dispatch => {

    console.log(UPDATE_WORD_INFO)
    console.log(`UPDATE_WORD_INFO of: ' "${word_id}" `)

    // 更新词信息
    dispatch({
        type: UPDATE_WORD_INFO,
        payload: {
            word_obj: word_obj,
            word_id: word_id
        }
    })

}
