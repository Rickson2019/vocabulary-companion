import React, { useState, Fragment, useEffect } from 'react'
import { Button } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux'
import axios from 'axios';
import $ from 'jquery'
function Admin() {

    const [wordlist, setWordList] = useState([])

    const [mountedUnit, setMountedUnit] = useState(null)

    const [all_word_lists, set_all_word_lists] = useState([])

    const getWordListByListName = async (list_name) => {
        console.log('getWordListByListName')
        console.log(list_name)
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

    // This is an async function
    const loadAllWords = async () => {
        console.log("loadAllWords")

        const response = axios.get(`${process.env.REACT_APP_EXPRESS_ENDPOINT}/return_all_the_unit_name`)
            .then(async function (response) {
                console.log(response.data);
                let data = response.data
                let languages_in_app = data.languages_in_app
                // I need this data here ^^
                for (var language of languages_in_app) {
                    console.log(language)
                    console.log(data[language])
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

    useEffect(() => {
        loadAllWords()
    }, [])

    return (
        <Fragment>

            {wordlist.length == 0 && <CircularProgress />}

            {wordlist.length > 0 &&
                <div>
                    {all_word_lists.map((item, index) => (
                        <div>{item.english_example_sentence_1}</div>
                    ))}
                </div>}

            {all_word_lists.length > 0 &&
                <div>
                    {all_word_lists.map((item, index) => (
                        <div>{item.english_example_sentence_1}</div>
                    ))}
                </div>
            }

            <Button onClick={loadAllWords}>return_all_the_unit_name</Button>
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