import React, { Fragment, useState } from 'react'
import { Button, TextField, Typography } from '@material-ui/core'

import DailyTaskPicker from './Componentes/DailyGoalPicker'
export default function Settings(props) {

    const [daily_goal, set_daily_goal] = useState(0)

    const [saved_notice_bool, toggle_saved_notice] = useState(false)

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

    const setChanged = () => {
        console.log('changed')

        toggle_saved_notice(true)

        setTimeout(() => {
            toggle_saved_notice(false)
        }, 1500);

    }

    // 1.乱序背记？
    // 2.夜间模式？
    // 3.切换发音者
    return (
        <Fragment>

            <div>
                {/* <input value={daily_goal} placeholder='' onChange={(e) => changeDailyGoal(e.target.value)} /> */}
                {saved_notice_bool &&
                    <Typography>Your configuration has been saved</Typography>
                }
                
                <Typography>
                    Set your daily goal of studying:
                </Typography>

                <DailyTaskPicker action={setChanged}/> 
                <Button onClick={setGoal} >Set Daily Goal</Button>
            </div>



        </Fragment>
    )
}
