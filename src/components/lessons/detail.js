import React from 'react'
import {connect} from 'react-redux'
import LessonEditor from './editor'
import NotFoundPage from '../404'

const LessonDetail = ({lesson, loading}) => {
    if(loading) return <div>Loading...</div>
    if(!lesson) return <NotFoundPage />

    return (
        <div className="mt-2">
            <hr/>

            <h6>Detail lesson</h6>
            <LessonEditor lesson={lesson} />
        </div>
    )
}

const mapState = (state, props) => {
    const lessonId = +props.lessonId
    const {lessons} = state

    return {
        lesson: lessons.data[lessonId],
        loading: lessons.loading
    }
}

export default connect(mapState)(LessonDetail)