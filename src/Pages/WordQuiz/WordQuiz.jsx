import React, { useEffect, useState, Fragment } from 'react'
// import { Score } from 'react-vexflow'
import {connect} from 'react-redux'
import $ from 'jquery'

import { Button } from '@material-ui/core'



 function NoteReading(props) {


    // 单元
    const [chosenUnit, setChosenUnit] = useState(null)

    // 判断是否已经开始
    const [startedBool, setStarted] = useState(false)

    // 当前加载的问题
    const [mountedQuestion, mountQuestion] = useState('')

    // 正确答案
    const [correctAnswer, setCorrectAnswer] = useState([''])

    // 判断答案正误
    const [answerCheck, setAnswerCheck] = useState('Choose an answer')

    // 可选项（干扰项+正确的选项）
    const [answerChoices, setAnswerChoices] = useState(['C', 'D', 'E', 'F', 'G', 'A', 'B'])


    // const [confusionChoices, setConfusionChoices] = useState('')

    const handleNext = () => {


        function __change_question() {

        }



        function __render() {

        }

        // __change_accidental()
        __change_question()

        __render()


    }


    const handleStart = () => {
        console.log('handleStart')
        setStarted(true)
    }

    // user_answer是一个局部变量
    const checkAnswer = (user_answer) => {
        console.log('checkAnswer()')
        console.log(user_answer)
        console.log(mountedQuestion)

        if (mountedQuestion === user_answer.toLowerCase()) {
            setAnswerCheck('Correct')

        }
        else if (mountedQuestion !== user_answer.toUpperCase()) {
            setAnswerCheck('Incorrect')
        }
    }


    useEffect(() => {
        console.log(props)
        
    }, [])


    return (
        <Fragment>
            <div id="progress-display"> </div>


            <div>

                <div>
                    {/* 相對應的顯示，有不同的JSS styling */}
                    {answerCheck === 'Correct' && <div style={{ color: 'green' }} id='answer-check-div'>{answerCheck}</div>}
                    {answerCheck === 'Incorrect' && <div style={{ color: 'red' }} id='answer-check-div'>{answerCheck}</div>}
                    {answerCheck === 'Choose an answer' && <div style={{ color: 'gray' }} id='answer-check-div'>{answerCheck}</div>}
                </div>


                

            </div>

            <div>

            </div>

            {(!startedBool && chosenUnit) && <Button variant='contained' color='primary' onClick={handleStart}>Start</Button>}
            {startedBool && <Button variant='contained' color='primary' onClick={handleNext}>Next</Button>}
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

export default connect(mapStateToProps, {})((NoteReading));