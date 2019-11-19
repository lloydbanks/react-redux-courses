import React from 'react'
import {connect} from 'react-redux'
import NotFound from '../404'
import {Link} from '@reach/router'
import NewLesson from './newLesson'
import {getLessonsByCourse, getCourseById} from '../../store/selectors'

const CourseDetail = ({id, course, lessons, loading}) => {
    if(loading) return <div>Loading...</div>
    if(!course) return <NotFound />

    return (
        <div className="card mb-3">
            <div className="row no-gutters">
                <div className="col-md-4">
                    <div className="card-header">
                        Course Lessons
                    </div>
                    <div className="card-body">
                        {lessons.length ? <ul>
                            {lessons.map(lesson => (<li key={lesson.id}>
                                <h5>{lesson.title}</h5>
                            </li>))}
                        </ul> : <p>No lesssons found</p>}

                        <NewLesson courseId={id} />
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="card-header">
                        Course info
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{course.title}</h5>
                        <p className="card-text">Price: ${course.price}</p>
                        <Link to="/courses" className="btn btn-secondary mr-1">Back to courses</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapState = (state, props) => {
    return {
        loading: state.courses.loading,
        course: getCourseById(state, props),
        lessons: getLessonsByCourse(state, props)
    }
}

export default connect(mapState)(CourseDetail)