import React, { Fragment, useState } from 'react'
import {Button} from '@material-ui/core'
import {setDailyGoal} from '../../actions/profileActions'

export default function Settings() {

    const [daily_goal, set_daily_goal] = useState(0)

    // 切换用户的每日目标
    const changeDailyGoal = (goal) => {
        console.log(goal)
        set_daily_goal(goal)
        console.log('daily goal')
        console.log(goal)
    }

    const setGoal = () => {
        console.log('set goal')

        // axios post 并进行修改
    }

 
    return (
        <Fragment>
            
            <div>
                <input value={daily_goal} placeholder='' onChange={(e) => changeDailyGoal(e.target.value)} />
                <Button onClick={setGoal}>Set Daily Goal</Button>

            </div>



        </Fragment>
    )
}
