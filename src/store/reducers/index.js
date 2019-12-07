import { combineReducers } from 'redux'
import app from './app'
import courses from './courses'
import lessons from './lessons'

combineReducers({ app, courses, lessons })

const rootReducer = combineReducers({ app, courses, lessons })
export default rootReducer
