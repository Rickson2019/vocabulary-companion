//  The resulting reducer calls every child reducer, 
//  and gathers their results into a single state object.
import { combineReducers } from 'redux'

import profileReducer from './profileReducer'

export default combineReducers({
    profile : profileReducer,
 })