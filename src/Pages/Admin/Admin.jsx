import React, { useState, Fragment, useEffect } from 'react'
import { Button } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux'
import axios from 'axios';
import $ from 'jquery'

import { TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import { Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    engStn: {
        width: '90vw'
    },
    langStn: {
        width: '90vw'
    },
    updateBtn: {
        color: 'white',
        background: 'green'
    },
    languageBtn: {
        width: '15vw'
    },
    unitList: {
        width: '25vw'
    }

}));

function Admin() {


    const [word_id_text, set_word_id_text] = useState(null)

    const [english_meaning_text, set_english_meaning_text] = useState(null)

    const [chinese_meaning_text, set_chinese_meaning_text] = useState(null)

    const [english_example_sentence_1_text, set_english_example_sentence_1_text] = useState(null)
    const [language_example_sentence_1_text, set_language_example_sentence_1_text] = useState(null)

    const [english_example_sentence_2_text, set_english_example_sentence_2_text] = useState(null)
    const [language_example_sentence_2_text, set_language_example_sentence_2_text] = useState(null)

    const [english_example_sentence_3_text, set_english_example_sentence_3_text] = useState(null)
    const [language_example_sentence_3_text, set_language_example_sentence_3_text] = useState(null)


    const [wordlist, setWordList] = useState([])

    const [mounted_unit_obj, set_mounted_unit_obj] = useState([])
    const [mounted_unit_name, set_mounted_unit_name] = useState(null)

    // A Hook for wordlist names
    const [all_wordlist_names_in_a_language, set_all_wordlist_names_in_a_language] = useState(null)

    const [all_the_unit_names, set_all_the_unit_names] = useState(null)

    const [all_languages_in_app, set_all_languages_in_app] = useState(null)

    const [all_units_in_language, set_all_units_in_language] = useState(null)

    const [all_word_lists, set_all_word_lists] = useState([])


    // 标识了一下这是第几个词
    const [item_index, set_item_index] = useState(0)

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

    const loadAllLanguageNames = () => {
        console.log('loadAllUnitNames')
        const response = axios.get(`${process.env.REACT_APP_EXPRESS_ENDPOINT}/return_all_the_unit_names`)
            .then(async function (response) {
                console.log(response.data);
                let all_the_unit_names = response.data
                let languages_in_app = all_the_unit_names.languages_in_app

                set_all_languages_in_app(languages_in_app)
                set_all_the_unit_names(all_the_unit_names)

                console.log('languages_in_app')
                console.log(languages_in_app)
                console.log('all_the_unit_names')
                console.log(all_the_unit_names)



            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const loadUnitNames = (language) => {
        console.log('loadUnits')
        console.log(language)
        console.log(all_the_unit_names[language])
        set_all_wordlist_names_in_a_language(all_the_unit_names[language])
    }

    const mountUnit = (unit_name) => {
        console.log('mountUnit')
        console.log(unit_name)
        // 
        getWordListByListName(unit_name).then((unit_obj) => {
            console.log(unit_obj)
            set_mounted_unit_name(unit_name)
            set_mounted_unit_obj(unit_obj)
        })


    }

    const handleChange = (e) => {
        console.log(e.target.value)
        console.log(e.target.text)
        e.target.value = e.target.value
    }

    // This is an async function
    const loadAllWords = async () => {
        console.log("loadAllWords")

        const response = axios.get(`${process.env.REACT_APP_EXPRESS_ENDPOINT}/return_all_the_unit_name`)
            .then(async function (response) {
                console.log(response.data);
                let data = response.data
                let languages_in_app = data.languages_in_app
                console.log(languages_in_app)
                // I need this data here ^^
                for (var language of languages_in_app) {
                    console.log(language)
                    console.log(data[language])
                    // data[language]是语言
                    data[language].forEach(element => {
                        console.log(element)

                        getWordListByListName(element)
                            .then((next_list) => {
                                console.log('next_list')
                                console.log(next_list)
                                $.when()
                                    .then(() => {
                                        return set_all_word_lists(all_word_lists.concat(next_list));
                                    }).done(() => {
                                        console.log('all_word_lists')
                                        console.log(all_word_lists)
                                    })



                            })



                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    // Load all the units, fetched from the database 
    // 加载所有云端单元
    const loadAllUnits = async () => {
        console.log("loadAllUnits")

        const response = axios.get(`${process.env.REACT_APP_EXPRESS_ENDPOINT}/return_all_the_unit_name`)
            .then(async function (response) {
                console.log(response.data);
                let data = response.data
                let languages_in_app = data.languages_in_app
                // I need this data here ^^
                for (var language of languages_in_app) {
                    console.log(language)
                    console.log(data[language])
                    // data[language]是语言
                    data[language].forEach(element => {
                        console.log(element)

                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }





    useEffect(() => {
        // loadAllWords()
        loadAllUnits()
    }, [])

    const classes = useStyles();

    // 下一个
    const handleNext = () => {
        set_item_index(item_index + 1)
        set_word_id_text(mounted_unit_obj[item_index].id)
        set_english_meaning_text(mounted_unit_obj[item_index].english_meaning)
        set_chinese_meaning_text(mounted_unit_obj[item_index].chinese_meaning)

        set_english_example_sentence_1_text(mounted_unit_obj[item_index].english_example_sentence_1)
        set_language_example_sentence_1_text(mounted_unit_obj[item_index].language_example_sentence_1)

 

        set_english_example_sentence_2_text(mounted_unit_obj[item_index].english_example_sentence_2)


        set_language_example_sentence_2_text(mounted_unit_obj[item_index].language_example_sentence_2)

        
        console.log(mounted_unit_obj[item_index].language_example_sentence_2)
        console.log(language_example_sentence_2_text)
        console.log(document.getElementById('language_example_sentence_2').value)


        set_english_example_sentence_3_text(mounted_unit_obj[item_index].english_example_sentence_3)
        set_language_example_sentence_3_text(mounted_unit_obj[item_index].language_example_sentence_3)
    }

    // 上一个
    const handleLast = () => {
        console.log('handleLast')
        set_item_index(item_index - 1)
    }


    const updateByID = async () => {

        let word_id_TextField = document.getElementById('word_id_TextField')

        let english_meaning_TextField = document.getElementById('english_meaning_TextField')
        let chinese_meaning_TextField = document.getElementById('chinese_meaning_TextField')

        let english_example_sentence_1 = document.getElementById('english_example_sentence_1')
        let language_example_sentence_1 = document.getElementById('language_example_sentence_1')

        let english_example_sentence_2 = document.getElementById('english_example_sentence_2')
        let language_example_sentence_2 = document.getElementById('language_example_sentence_2')

        let english_example_sentence_3 = document.getElementById('english_example_sentence_3')
        let language_example_sentence_3 = document.getElementById('language_example_sentence_3')

        console.log(word_id_TextField.value)
        console.log(english_meaning_TextField.value)
        console.log(chinese_meaning_TextField.value)

        console.log(english_example_sentence_1.value)
        console.log(language_example_sentence_1.value)

        console.log(english_example_sentence_2.value)
        console.log(language_example_sentence_2.value)

        console.log(english_example_sentence_3.value)
        console.log(language_example_sentence_3.value)

        return axios.post(`${process.env.REACT_APP_EXPRESS_ENDPOINT}/update_word_information_by_word_id`, {
            // important, the word list's name 
            wordlist_name: mounted_unit_name,
            id: word_id_TextField.value,
            english_meaning: english_meaning_TextField.value,
            chinese_meaning: chinese_meaning_TextField.value,

            english_example_sentence_1: english_example_sentence_1.value,
            language_example_sentence_1: language_example_sentence_1.value,

            english_example_sentence_2: english_example_sentence_2.value,
            language_example_sentence_2: language_example_sentence_2.value,

            english_example_sentence_3: english_example_sentence_3.value,
            language_example_sentence_3: language_example_sentence_3.value,


        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

    }


    // const handleChange = (e) => {
    //     console.log(e.target.value)

    // }

    // When the 'update' button is pressed 当 "修改" 按钮被按下时
    // the updated information 将更新的内容
    // will be written into the database 传入数据库
    const handleUpdate = () => {
        console.log("handleUpdate")

    }




    return (
        <Fragment>




            {
                !(all_word_lists.length > 0 ||
                    all_languages_in_app === !null)
                &&
                <Fragment>
                    <CircularProgress />
                    <p>Loading........</p>
                </Fragment>
            }

            {/* Allows the user to Choose from a list of Languages to inspect */}
            {
                all_languages_in_app
                &&
                <Fragment>
                    {all_languages_in_app.map((item, idx) => (
                        <Button variant='outlined' onClick={() => loadUnitNames(item)} className={classes.languageBtn}>{item}</Button>
                    ))}
                    <Divider />
                </Fragment>
            }

            {/* Allows the user to Choose from a list of units to inspect */}
            {
                all_wordlist_names_in_a_language
                &&
                <Fragment>
                    {all_wordlist_names_in_a_language.map((item, idx) => (
                        <button className={classes.unitList} variant='outlined' onClick={() => mountUnit(item)} className={classes.languageBtn}>{item}</button>
                    ))}
                    <Divider />
                </Fragment>
            }


            {wordlist.length > 0 &&
                <div>
                    {all_word_lists.map((item, index) => (
                        <div>{item.english_example_sentence_1}</div>
                    ))}
                </div>}

            {mounted_unit_obj.length > 0 &&
                <div>
                    {/* {all_word_lists[item_index].map((item, index) => (
                        <div>
                            <TextField className={classes.engStn} defaultValue={item.english_example_sentence_1} />
                            <br/>
                            <TextField className={classes.langStn} defaultValue={item.language_example_sentence_1} />
                            
                            <Fragment>
                            {item_index > 0 && <Button >Last</Button>}
                            <Button >Next</Button>
                                </Fragment>
                        </div>
                    ))} */}

                    <Fragment>
                        <p>{mounted_unit_obj[item_index].id}</p>
                        <TextField defaultValue='word' id='word_id_TextField' className={classes.wordId} label={'Word ID'} value={word_id_text} onChange={(e) => set_word_id_text(e.target.value)} />
                        <Divider />

                        <TextField defaultValue='en' id='english_meaning_TextField' className={classes.enMeaning} label={'English Meaning'}  value={english_meaning_text} onChange={(e) => set_english_meaning_text(e.target.value)}/>
                        <Divider />

                        <TextField defaultValue='cn' id='chinese_meaning_TextField' className={classes.cnMeaning} label={'Chinese Meaning'} value={chinese_meaning_text} onChange={(e) => set_chinese_meaning_text(e.target.value)} />
                        <Divider />

                        <TextField defaultValue='stz' id='english_example_sentence_1' className={classes.engStn} label={'english_example_sentence_1'} value={english_example_sentence_1_text} onChange={(e) => set_english_example_sentence_1_text(e.target.value)} />
                        <Divider />

                        <TextField defaultValue='stz' id='language_example_sentence_1' className={classes.langStn} label={'language_example_sentence_1'} value={language_example_sentence_1_text} onChange={(e) => set_language_example_sentence_1_text(e.target.value)} />
                        <Divider />

                        <TextField defaultValue='stz' id='english_example_sentence_2' className={classes.engStn} label={'english_example_sentence_2'} value={english_example_sentence_2_text} onChange={(e) => set_english_example_sentence_2_text(e.target.value)}/>
                        <Divider />

                        <TextField defaultValue='stz' id='language_example_sentence_2' className={classes.langStn} label={'language_example_sentence_2'} value={language_example_sentence_2_text} onChange={(e) => set_language_example_sentence_2_text(e.target.value)}/>
                        <Divider />

                        <TextField defaultValue='stz' id='english_example_sentence_3' className={classes.engStn} label={'english_example_sentence_3'} value={english_example_sentence_3_text} onChange={(e) => set_english_example_sentence_3_text(e.target.value)}/>
                        <Divider />

                        <TextField defaultValue={undefined} id='language_example_sentence_3' className={classes.langStn} label={'language_example_sentence_3'} onChange={(e) => set_language_example_sentence_3_text(e)} value={language_example_sentence_3_text} />
                        <Divider />

                        <Button className={classes.updateBtn} onClick={updateByID} >Update</Button>
                        <Fragment>
                            {item_index > 0 && <Button color='secondary' variant='contained' onClick={handleLast} >Last</Button>}
                            <Button color='primary' variant='contained' onClick={handleNext}>Next</Button>

                        </Fragment>

                    </Fragment>

                </div>
            }

            {/* <Button onClick={loadAllWords}>return_all_the_unit_name</Button>
            <Button onClick={loadAllUnits}>Load All The Units</Button> */}

            <Button color='primary' variant='contained' onClick={loadAllLanguageNames}>loadAllUnitNames</Button>
        </Fragment>

    )
}

function mapStateToProps(state, ownProps) {
    console.log('props')
    console.log(ownProps)
    return {
        mounted_unit_obj: state.profile.mounted_unit_obj,
        mounted_unit_name: state.profile.mounted_unit_obj
    }

}

export default connect(mapStateToProps, {})((Admin));