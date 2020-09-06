import React, { Fragment, useEffect, useState } from 'react'
import { connect } from "react-redux";
import { getDailyGoal } from '../../actions/profileActions'
import store from '../../store'
import { Button } from '@material-ui/core'
import ProgressBar from '../shared_components/ProgressBar/ProgressBar'

function WordFlashCards(props) {


    useEffect(() => {
        props.getDailyGoal()
        console.log(props.daily_goal)
        console.log(props.mounted_unit_obj)

    }, [props.mounted_unit_obj])

    const [learned_word_list, set_learned] = useState([])

    const [progress_INT, set_progress] = useState(0)

    const [mounted_flashcard, set_mounted_flashcard] = useState(null)

    // const 

    const mountNewFlashCard = () => {
        console.log('mountNewFlashCard')
        let mounted_unit_obj = props.mounted_unit_obj
        console.log(mounted_unit_obj)
        let wordlist_length = Object.keys(mounted_unit_obj).length
        let rand = Math.floor(Math.random() * wordlist_length)
        let random_flashcard = mounted_unit_obj[Object.keys(mounted_unit_obj)[rand]]
        set_mounted_flashcard(random_flashcard)
        console.log(random_flashcard)
    }


    const skipCurrent = () => {
        console.log('skip current')
    }

    const handleNext = () => {
        console.log('in handleNext()')

        mountNewFlashCard()

        set_progress(progress_INT + 1)
    }

    // const 

    return (
        <Fragment>
            <ProgressBar progress={progress_INT} total={props.daily_goal} />
            <Button variant='contained' onClick={skipCurrent}>Skip</Button>
            <Button variant='contained' color='primary' onClick={handleNext}>Next</Button>


            {mounted_flashcard && <div>
                <div id='flash-card-word'>{mounted_flashcard.id}</div>
                <div id='flash-card-english-meaning'>{mounted_flashcard.english_meaning}</div>
                <div id='flash-card-pronounciation'>/{mounted_flashcard.pronounciation}/</div>
                <img style ={{maxWidth:'60vw'}} src={`/images/essential_french/${mounted_flashcard.id}.jpg`} />
            </div>}
        </Fragment>
    )
}

function mapStateToProps(state, ownProps) {
    console.log('props')
    console.log(ownProps)
    return {
        daily_goal: state.profile.daily_goal,
        mounted_unit_obj: state.profile.mounted_unit_obj
    }

}

export default connect(mapStateToProps, { getDailyGoal })((WordFlashCards));