// 导入React 相关的一些Component以及functions
import React, { Fragment, useEffect, useState } from 'react'
// JQuery框架
import $ from 'jquery'

// 这是为了连接到redux的状态管理器
import { connect } from "react-redux";
// redux当中的一个function，用于获取用户每日定的学习计划
import { getDailyGoal,archiveCurrent } from '../../actions/profileActions'

// Material UI 组件库
import { Button } from '@material-ui/core'
// 自定义的进度条
import ProgressBar from '../shared_components/ProgressBar/ProgressBar'

function WordFlashCards(props) {
    useEffect(() => {
        props.getDailyGoal()
        console.log(props.daily_goal)
        console.log(props.mounted_unit_obj)

    }, [props.mounted_unit_obj])

    // 已经学过的单词
    const [learned_word_list, set_learned] = useState([])

    const [words_to_learn_list, set_words_to_learn] = useState(props.mounted_unit_obj)

    const [progress_INT, set_progress] = useState(0)

    const [mounted_flashcard, set_mounted_flashcard] = useState(null)

    // 更新卡片
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

    // 从待学的list里面移除
    const removeFromToLearnList = () => {
        console.log('removeFromToLearnList')
        let words_to_learn_obj = words_to_learn_list
        console.log(words_to_learn_obj)
        delete words_to_learn_obj[mounted_flashcard.id]
        

        $.when()
        .then(()=>{
            set_words_to_learn(words_to_learn_obj)
        })
        .then(()=>{
            console.log(words_to_learn_list)
        })
        .then(()=>{
            props.archiveCurrent(mounted_flashcard.id)
        })
        
        
    }

    // 跳过当前这张卡片
    const skipCurrent = () => {
        console.log('skip current')

    }

    // 下一张卡片
    const handleNext = () => {
        console.log('in handleNext()')

        
        mountNewFlashCard()

        set_progress(progress_INT + 1)
    }

    // “斩” 掉这张卡片
    const archiveCurrent = () => {
        console.log('archive')
        $.when()
            .then(() => {
                // 若这个单词在“已斩”当中未存在
                // 那么就把它给加入“已斩”
                if(mounted_flashcard && !learned_word_list.includes(mounted_flashcard)){
                    learned_word_list.push(mounted_flashcard)
                }
                removeFromToLearnList()

            })
            .then(() => {
                // 设置为已会
                set_learned(learned_word_list)
                
            })
            .then(()=>{
                // 
                console.log(learned_word_list)
                // 斩的同时放新卡上去
                mountNewFlashCard()
            })
    }

    return (
        <Fragment>  

            <ProgressBar progress={progress_INT} total={props.daily_goal} />
            <Button variant='contained' onClick={skipCurrent}>Skip</Button>
            <Button variant='contained' color='primary' onClick={handleNext}>Next</Button>
            <Button variant='contained' color='primary' onClick={archiveCurrent}>Archive</Button>

            {mounted_flashcard && <div>
                <div id='flash-card-word'>{mounted_flashcard.id}</div>
                <div id='flash-card-english-meaning'>{mounted_flashcard.english_meaning}</div>
                <div id='flash-card-pronounciation'>/{mounted_flashcard.pronounciation}/</div>
                <img style={{ maxWidth: '60vw' }} src={`/images/essential_french/${mounted_flashcard.id}.jpg`} />
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

// 
export default connect(mapStateToProps, { getDailyGoal, archiveCurrent})((WordFlashCards));