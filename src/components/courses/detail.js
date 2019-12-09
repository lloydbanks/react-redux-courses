import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import NotFound from '../404'
import { Link, Match } from '@reach/router'
import Lesson from './lesson'
import { getLessonsByCourse, getCourseById } from '../../store/selectors'
import {
  getLessons,
  addLesson,
  saveLesson,
  togglePreviewMode
} from '../../store/actions'

const CourseDetail = ({
  id,
  course,
  lessons,
  loading,
  getLessons,
  addLesson,
  saveLesson,
  children,
  previewMode,
  togglePreviewMode
}) => {
  useEffect(() => {
    getLessons(id)
  }, [course])

  if (loading) return <div>Loading...</div>
  if (!course) return <NotFound />

  return (
    <div className="card mb-3">
      <div className="row no-gutters">
        <div className="col-md-4">
          <div className="card-header">Course Lessons</div>
          <div className="card-body">
            {lessons.length ? (
              <ol>
                {lessons.map(lesson => (
                  <Match key={lesson.id} path={`lessons/${lesson.id}`}>
                    {({ match }) => {
                      const className = `lesson-item ${
                        match ? 'bg-light border' : ''
                      }`

                      return (
                        <li>
                          <Lesson
                            className={className}
                            lesson={lesson}
                            onSubmit={title =>
                              saveLesson({
                                ...lesson,
                                title
                              })
                            }
                          >
                            {(edit, remove) => (
                              <Link to={`lessons/${lesson.id}`}>
                                <button
                                  type="button"
                                  className={className + ' btn'}
                                >
                                  {lesson.title}
                                  <span
                                    className="ml-2 badge badge-primary"
                                    onClick={() => edit(lesson.title)}
                                  >
                                    Edit
                                  </span>
                                  <span
                                    className="ml-2 badge badge-danger"
                                    onClick={() => remove(lesson)}
                                  >
                                    Remove
                                  </span>
                                </button>
                              </Link>
                            )}
                          </Lesson>
                        </li>
                      )
                    }}
                  </Match>
                ))}
              </ol>
            ) : (
              <p>No lesssons found</p>
            )}

            <Lesson
              onSubmit={title => addLesson({ title, courseId: course.id })}
            >
              {edit => (
                <button className="btn btn-success" onClick={edit}>
                  Add new lesson
                </button>
              )}
            </Lesson>

            {!!lessons.length && (
              <Match path={`lessons/:lessonId`}>
                {({ match }) => {
                  return (
                    match && (
                      <div className="lesson mt-2">
                        <hr />
                        <button
                          onClick={togglePreviewMode}
                          className="btn btn-secondary btn-sm"
                        >
                          {previewMode ? 'Edit' : 'Preview'}
                        </button>
                        {children}
                      </div>
                    )
                  )
                }}
              </Match>
            )}
          </div>
        </div>
        <div className="col-md-8">
          <div className="card-header">Course info</div>
          <div className="card-body">
            <h5 className="card-title">{course.title}</h5>
            <p className="card-text">Price: ${course.price}</p>
            <Link to="/courses" className="btn btn-secondary mr-1">
              Back to courses
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapState = (state, props) => {
  return {
    previewMode: state.app.previewMode,
    loading: state.courses.loading,
    course: getCourseById(state, props),
    lessons: getLessonsByCourse(state, props)
  }
}

export default connect(mapState, {
  getLessons,
  addLesson,
  saveLesson,
  togglePreviewMode
})(CourseDetail)
