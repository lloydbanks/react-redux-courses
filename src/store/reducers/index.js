import {combineReducers} from 'redux'
import courses from './courses'
import lessons from './lessons'

combineReducers({courses, lessons})

const rootReducer = combineReducers({courses, lessons})
export default rootReducer