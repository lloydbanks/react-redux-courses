import React from 'react'
import { Router, Redirect } from '@reach/router'
import Courses from './courses'
import CourseDetail from './courses/detail'
import LessonDetail from './lessons/detail'

function App() {
  return (
    <div className="container">
      <Router>
        <Redirect noThrow from="/" to="/courses" />
        <Courses path="/courses" />
        <CourseDetail path="/courses/:id">
          <LessonDetail path="lessons/:lessonId" />
        </CourseDetail>
      </Router>
    </div>
  )
}

export default App
