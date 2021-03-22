import React, { useState, useEffect } from 'react'
import SelectionMenu from '../Components/SelectionMenu'
import { admin_input_types, input_group_types } from '../attributes'
import { connect } from 'react-redux'
// const admin_input_type_context = React.createContext();
import styles from '../Styles/admin.module.scss'
import input_groups_id_tracker_schema from '../attributes'

import {
    loadAllLanguageNames, //获取数据库中所有的Language种类
    getWordListByListName
} from '../actions/adminActions'

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

// const {}

function MultipleChoice({ loadAllLanguageNames }) {

    //input_groups_id_tracker初始值都是1
    const [input_groups_id_tracker, updateInputGroupsIDtracker] = useState(input_groups_id_tracker_schema);

    const [input_groups, setInputs] = useState([[{ key: 0, id: 0, type: language_example_sentence }, { id: 1, type: english_example_sentence }],])

    useEffect(() => {
        console.log('loadAllLanguageNames()')
        loadAllLanguageNames()
    }, [])


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
        <div>
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
    );


}


function mapStateToProps(state, ownProps) {

    console.log('props')
    console.log(ownProps)

    return {
        mounted_unit_obj: state.profile.mounted_unit_obj,
        mounted_unit_name: state.profile.mounted_unit_obj
    }

}

export default connect(mapStateToProps, {
    loadAllLanguageNames,
    getWordListByListName
})((MultipleChoice));



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