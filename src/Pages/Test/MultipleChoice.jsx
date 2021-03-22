import React, { useState, useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';

import SelectionMenu from '../../Components/SelectionMenu'
import { admin_input_types, input_group_types } from '../../attributes'
import { connect } from 'react-redux'
// const admin_input_type_context = React.createContext();
import styles from '../../Styles/admin.module.scss'
import { input_groups_id_tracker_schema } from '../../attributes'

import {

    loadAllLanguageNames, //获取数据库中所有的Language种类
    getWordListByListName, //用wordList的名字来获取WordList
    loadAllUnitNamesByLanguageName //显示所有该语言的Unit

} from '../../actions/adminActions'

import { admin_page_states } from '../../attributes'
import { Fragment } from 'react'

import Button from '@material-ui/core/Button';



// Destructuring the admin_input_types
const {
    word_id,

    language_example_sentence,
    english_example_sentence,
    chinese_example_sentence,

    english_meaning,
    chinese_meaning,


} = admin_input_types

const {
    NEW_WORD,
    WORD_MEANING,
    EXAMPLE_SENTENCE
} = input_group_types


const {
    LOADING_LANGUAGE_LIST,
    PICK_A_LANGUAGE_TO_MANAGE,
    CHOOSE_A_WORD_LIST_TO_MODIFY,
    LOADING_WORD_LIST,
    MODIFY_WORD_INFO,
    SAVING_CHANGES
} = admin_page_states

// loadAllLanguageNames : 
function Admin({
    // functions:
    loadAllLanguageNames,  //获取数据库中所有的Language种类
    loadAllUnitNamesByLanguageName, //用wordList的名字来获取WordList

    // states:
    all_languages_in_DB,  //显示所有该语言的Unit
    wordlists_in_the_language
}) {

    // Word List
    const [word_list, setWordList] = useState();


    // input_groups_id_tracker初始值都是1
    const [input_groups_id_tracker, updateInputGroupsIDtracker] = useState(input_groups_id_tracker_schema);



    // 存放render的input textfield数据
    const [input_groups, setInputs] = useState([[{ key: 0, id: 0, type: language_example_sentence }, { id: 1, type: english_example_sentence }],])


    const [PAGE_STATE, setPageState] = useState(LOADING_LANGUAGE_LIST);


    // 当前页面的 STATE
    useEffect(() => {

        if (PAGE_STATE === LOADING_LANGUAGE_LIST) {
            console.log("CURRENT_STATE:")
            console.log(PAGE_STATE)
            //If state is LOADING_LANGUAGE_LIST, load languages
            loadAllLanguageNames()
        }
        else {
            console.log("CURRENT_STATE:")
            console.log(PAGE_STATE)
        }
        // 传入这个STATE，只要它发生变化，就执行第一个param的()=>{ }
    }, [PAGE_STATE])

    // TODO : PICK_A_LANGUAGE_TO_MANAGE
    useEffect(() => {
        if (all_languages_in_DB.length !== 0) {

            setPageState(PICK_A_LANGUAGE_TO_MANAGE)

        }
        if (wordlists_in_the_language instanceof Array && wordlists_in_the_language.length !== 0) {

            setPageState(CHOOSE_A_WORD_LIST_TO_MODIFY)
        }

    }, [all_languages_in_DB, wordlists_in_the_language])

    // TODO :CHOOSE_A_WORD_LIST_TO_MODIFY
    useEffect(() => {
        console.log('wordlists_in_the_language')
        console.log(wordlists_in_the_language)
        if (wordlists_in_the_language instanceof Array && wordlists_in_the_language.length !== 0) {
            console.log('current state:')
            console.log(CHOOSE_A_WORD_LIST_TO_MODIFY)
            setPageState(CHOOSE_A_WORD_LIST_TO_MODIFY)
        }
    }, [wordlists_in_the_language])




    const appendInput = (input_group_option) => {
        // 初始化：是 NEW_WORD 类型
        let newInput = [{ key: input_groups.length, id: input_groups.length, type: word_id }];
        // input_type_option 决定具体是什么内容
        switch (input_group_option) {
            case NEW_WORD:
                newInput = [{ key: input_groups.length, id: input_groups.length, type: word_id }];
                break;
            case WORD_MEANING:
                newInput = [{ key: input_groups.length, id: input_groups.length, type: english_meaning }, { key: input_groups.length, id: input_groups.length + 1, type: english_example_sentence }];
                break;
            case EXAMPLE_SENTENCE:
                newInput = [{ key: input_groups.length, id: input_groups.length, type: language_example_sentence }, { key: input_groups.length + 1, id: input_groups.length + 1, type: english_example_sentence }, { key: input_groups.length + 2, id: input_groups.length + 2, type: chinese_example_sentence }]
                break;
            default:
                break;
        }


        console.log('newInput')
        console.log(newInput)

        setInputs(prevState => [...prevState, newInput]);
    }


    // Set Opt 的hook
    const [child_input_type_opt, setOpt] = useState(null)


    // 传入SelectionMenu，用于获取用户选择的option
    const getOptionFunction = (option) => {
        console.log('getOptionFunction');
        console.log('option')
        console.log(option)
        setOpt(option)
    }

    return (
        <Fragment>
            {/* 加载中显示转圈圈 */}
            {(PAGE_STATE === LOADING_WORD_LIST || PAGE_STATE === LOADING_LANGUAGE_LIST)
                &&
                <Fragment>
                    <CircularProgress />
                    <p>Loading........</p>
                </Fragment>
            }

            {/* 显示所有的语言 */}
            {(PAGE_STATE === PICK_A_LANGUAGE_TO_MANAGE && all_languages_in_DB instanceof Array)
                && all_languages_in_DB.map((language) =>
                    <div key='' id='' className={styles.language_btn_div}>
                        <Button className={styles.language_btn} variant="contained" color="primary" onClick={() => {
                            console.log(`loaded${language}`);
                            console.log(`Load All Unit Names By Language Name`)
                            loadAllUnitNamesByLanguageName(language)

                        }} >
                            {language}
                        </Button>
                    </div>
                )}

            {/* 显示这个语言所有的单元 */}
            {(PAGE_STATE === CHOOSE_A_WORD_LIST_TO_MODIFY && wordlists_in_the_language instanceof Array)
                && wordlists_in_the_language.map((word_list) =>
                    <div key='' id='' className={styles.language_btn_div}>
                        <Button className={styles.language_btn} variant="contained" color="primary" onClick={() => {
                            console.log(`loaded${word_list}`);
                            console.log(`Load All Unit Names By Language Name`)
                            loadAllUnitNamesByLanguageName(word_list)

                        }} >
                            {word_list}
                        </Button>
                    </div>
                )}



            <div id='MODIFY_WORD_INFO-div'>
                <form>
                    <div id="dynamicInput">
                        <div >
                            {(input_groups instanceof Array) && input_groups.map((group) =>
                                <div className={styles.input_group}>
                                    {group.map((item) =>
                                        item.type &&
                                        <div key={item.id} className={styles.input_field_div}>
                                            <label>{item.type}</label>
                                            <input name={item.id} id={`input-${item.id}`} />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </form>

                <div className={styles.add_input_field_div} >
                    <SelectionMenu
                        options={Object.values(input_group_types)}
                        prompt_label={'Choose a type of input to create'}
                        func={(opt) => getOptionFunction(opt)} />

                    <button onClick={() => appendInput(child_input_type_opt)}>
                        +
                </button>
                </div>
            </div >

        </Fragment>
    );


}


function mapStateToProps(state, ownProps) {

    console.log('mapStateToProps, state:')
    console.log(state)

    // 这里也要经常修改
    return {
        all_languages_in_DB: state.admin.all_languages_in_DB,
        wordlists_in_the_language: state.admin.wordlists_in_the_language
    }

}

export default connect(mapStateToProps, {
    loadAllLanguageNames,
    getWordListByListName,
    loadAllUnitNamesByLanguageName
})((Admin));



//// ARCHIVED:

// useEffect(() => {
//     console.log('child_input_type_opt')
//     console.log(child_input_type_opt)
// }, [child_input_type_opt])

// useEffect(() => {
//     console.log('inputs')
//     console.log(input_groups)
//     if (input_groups instanceof Array) {
//         console.log('inputs is an array')
//     }
// }, [input_groups])

// useEffect(() => {
//     console.log('input_groups_id_tracker')
//     console.log(input_groups_id_tracker)

// }, [input_groups_id_tracker])