//  The resulting reducer calls every child reducer, 
//  and gathers their results into a single state object.
import { combineReducers } from 'redux'

import profileReducer from './profileReducer'
import backstageReducer from './backstageReducer'

// 把Reducers给联合起来
export default combineReducers({
    profile : profileReducer,
    backstage : backstageReducer,
 })
