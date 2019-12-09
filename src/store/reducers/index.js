import { firebaseReducer } from 'react-redux-firebase'
import { combineReducers } from 'redux'
import app from './app'
import courses from './courses'
import lessons from './lessons'

combineReducers({ app, courses, lessons })

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  app,
  courses,
  lessons
})
export default rootReducer
