import React, { useEffect, useState, Fragment } from 'react'
import { Button } from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import { connect } from "react-redux";
import {mountUnitObj} from '../../actions/profileActions'


var essential_french_JSON = require('../../Data/essential_french')

var wordlist = [essential_french_JSON]

function UnitChoice(props) {

    useEffect(() => {
        console.log(wordlist)
    }, [wordlist])


    const [mountedUnit, setMountedUnit] = useState(null)

    const [startLearningBool, setStartLearning] = useState(false)

    const chooseUnit = (unit) => {
        setMountedUnit(unit)
        console.log(unit)
        props.mountUnitObj(unit)
    }

    const startLearning = () => {
        console.log('start learning')
        setStartLearning(true)
        

    }
    // return (
    //     <div>
    //         {wordlist.map((item,idx)=>(
    //             <div>
    //                 {Object.keys(item).map((item,idx)=>(
    //                     <div>{item}</div>
    //                 ))}
    //             </div>
    //         ))}
    //     </div>
    // )


    return (
        <Fragment>

            <div>{wordlist.map((item, idx) => (<Button variant='outlined' color='primary' onClick={() => chooseUnit(Object.keys(item))}>{Object.keys(item)}</Button>))}</div>

            {mountedUnit && <div>
                
                <div>You have Chosen {mountedUnit}</div>
                <div>Want to start learning now?</div>
                <Button variant='contained' color='primary' onClick={startLearning}>Yes</Button>
                <Button variant='contained' color='secondary' onClick={() => setMountedUnit(null)}>No</Button>

            </div>}

            {/* {startLearningBool && <Redirect to='/word-quiz' />} */}
            {startLearningBool && <Redirect to='/word-flash-cards' />}
        </Fragment>
    )
}

export default connect(null, {mountUnitObj})((UnitChoice));