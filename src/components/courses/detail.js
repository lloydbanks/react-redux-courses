import React from 'react'
import {connect} from 'react-redux'
import NotFound from '../404'

const CourseDetail = ({id, course, loading}) => {
    if(loading) return <div>Loading...</div>
    if(!course) return <NotFound />

    return <div>Viewing {course.title}</div>
}

const mapState = (state, props) => {
    return {
        loading: state.courses.loading,
        course: state.courses.courses.find(
            c => c.id === +props.id
        )
    }
}

export default connect(mapState)(CourseDetail)