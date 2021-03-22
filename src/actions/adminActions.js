import axios from "axios";


import {
    GET_WORD_LIST_BY_NAME,
    UPDATE_WORD_INFO,
    MOUNT_UNIT_NAME,
    LOAD_ALL_LANGUAGE_NAMES,
    LOAD_ALL_UNITS_BY_LANGUAGE_NAME
} from './types'


// 根据词单名获取整个词单(axios POST)
export const getWordListByListName = async (list_name) => dispatch => {
    console.log('getWordListByListName')
    console.log(list_name)

    // 传wordlist_name获得词单 
    return axios.post(`${process.env.REACT_APP_EXPRESS_ENDPOINT}/get_word_list_by_list_name`, { list_name: list_name }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            console.log(response.data)
            // 返回值
            return response.data
        })
}

// 加载数据库中所有已有语言
export const loadAllLanguageNames = () => dispatch => {
    console.log('inside of loadAllLanguageNames')
    axios.get(`${process.env.REACT_APP_EXPRESS_ENDPOINT}/get_all_language_names`)
        .then((response) => {
            console.log(response.data);
            let all_languages_in_DB = response.data

            console.log('all_languages_in_DB')
            console.log(all_languages_in_DB)

            dispatch({
                type: LOAD_ALL_LANGUAGE_NAMES,
                payload: all_languages_in_DB,
            })

        })
        .catch(function (error) {
            console.log(error);
        });
}


// 加载数据库中所有已有该语言的单元
export const loadAllUnitNamesByLanguageName = (language) => dispatch => {

    console.log('inside of loadAllUnitNamesByLanguageName')
    console.log(LOAD_ALL_UNITS_BY_LANGUAGE_NAME)

    axios.post(`${process.env.REACT_APP_EXPRESS_ENDPOINT}/get_word_lists_by_language_name`, { language: language })
        .then((response) => {
            console.log(response.data);
            let all_units = response.data

            console.log('all_units_of' + language)
            console.log(all_units)

            dispatch({
                type: LOAD_ALL_UNITS_BY_LANGUAGE_NAME,
                payload: all_units,
            })

        })
        .catch(function (error) {
            console.log(error);
        });
}