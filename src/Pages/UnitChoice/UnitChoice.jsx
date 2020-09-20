import React, { useEffect, useState, Fragment } from 'react'
import { Button, Typography } from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import { connect } from "react-redux";
import axios from 'axios'
import $, { type } from 'jquery'
// // 传本地JSON文件
import { mountUnitObjLocal,mountUnitName } from '../../actions/profileActions'


// var essential_french_JSON = require('../../Data/essential_french')
// var german_demo_JSON = require('../../Data/german_demo')

// var wordlist = [essential_french_JSON, german_demo_JSON]

const language_version = 'German';

function UnitChoice(props) {

    useEffect(() => {
        console.log('loadAllLanguageNames')
        $.when()
            .then(() => {
                loadAllLanguageNames()
            })
            .then(() => {
                loadUnitNames(language_version)
            })
            .then(()=>{
                console.log('all_the_unit_names')
                console.log(all_the_unit_names)
            })




        console.log(language_version)
    }, [language_version])

    const [loading, setLoading] = useState(null);

    const [all_the_unit_names, set_all_the_unit_names] = useState(null)

    const [all_languages_in_app, set_all_languages_in_app] = useState(null)

    const [all_wordlist_names_in_a_language, set_all_wordlist_names_in_a_language] = useState(null)

    const [mounted_language, set_mounted_language] = useState();


    // 选择单元
    const [mountedUnit, setMountedUnit] = useState(null)

    // 开始学习（Redirect）
    const [startLearningBool, setStartLearning] = useState(false)

    // 切换学习模式
    const [studyMode, setStudyMode] = useState(false)

    const chooseUnit = (unit_name) => {

        setMountedUnit(unit_name)
        console.log(unit_name)

        // if (wordlist[unit_name])
        //     console.log(wordlist[unit_name])

        props.mountUnitObjLocal(unit_name);
        props.mountUnitName(unit_name);
    }

    const startLearning = () => {
        console.log('start learning')
        setStartLearning(true)
    }

    const handleFlashCardMode = () => {
        setStudyMode('flash_card_mode')
    }

    const handleQuizMode = () => {
        setStudyMode('quiz_mode')
    }


    const loadAllLanguageNames = () => {
        console.log('loadAllUnitNames')
        setLoading(true)
        const response = axios.get(`${process.env.REACT_APP_EXPRESS_ENDPOINT}/return_all_the_unit_names`)
            .then(async function (response) {
                console.log(response.data);
                let unit_indices = response.data
                let all_word_list_names_in_current_language = unit_indices[language_version]

                set_all_wordlist_names_in_a_language(all_word_list_names_in_current_language)


                setLoading(false);


            })
            .catch(function (error) {
                console.log(error);
            });
    }


    // 根据词单名获取整个词单
    const getWordListByListName = async (list_name) => {
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
                return response.data
            })
    }

    const loadUnitNames = (language_version) => {

        console.log(`loadUnits of the ${language_version} language`)

        console.log(all_the_unit_names[language_version])

        set_mounted_language(language_version);

        set_all_wordlist_names_in_a_language(all_the_unit_names[language_version])
    }

    return (
        <Fragment>

            {all_wordlist_names_in_a_language && <div>{all_wordlist_names_in_a_language.map((item, idx) => (<Button variant='outlined' color='primary' onClick={ item.length? () => chooseUnit(item): () => chooseUnit(Object.keys(item)) }>{item}</Button>))}</div>}
            {/* {all_wordlist_names_in_a_language && <div>{all_wordlist_names_in_a_language.map((item, idx) => (<Button variant='outlined' color='primary' onClick={() => chooseUnit(item)}>{item}</Button>))}</div>} */}

            {mountedUnit && <div>

                <div>You have Chosen {mountedUnit}</div>
                <div>Want to start learning now?</div>
                <Button variant='contained' color='primary' onClick={startLearning}>Yes</Button>
                <Button variant='contained' color='secondary' onClick={() => setMountedUnit(null)}>No</Button>

            </div>}

            {/* Study mode choice */}
            {startLearningBool &&
                <Fragment>
                    <Typography>Pick a study mode</Typography>
                    <Button variant='contained' color='primary' onClick={handleFlashCardMode}>Flash Cards</Button>
                    <Button variant='contained' color='primary' onClick={handleQuizMode}>Quiz Mode</Button>
                </Fragment>}

            {studyMode === 'quiz_mode' && <Redirect to='/word-quiz' />}
            {studyMode === 'flash_card_mode' && <Redirect to='/word-flash-cards' />}

        </Fragment>
    )
}

// connects to redux store 
// {mountUnitObjLocal} is not in use now
export default connect(null, {mountUnitObjLocal , mountUnitName})((UnitChoice));