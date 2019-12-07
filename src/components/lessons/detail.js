import React from 'react'
import {connect} from 'react-redux'
import LessonEditor from './editor'
import NotFoundPage from '../404'
import ReactMarkdown from 'react-markdown'

const LessonDetail = ({lesson, loading, error, previewMode}) => {
    if(loading) return <div>Loading...</div>
    if(error) return <div className="text-danger">{error.message}</div>
    if(!lesson) return <NotFoundPage />

    return previewMode ?
        <ReactMarkdown source={lesson.markdown || ''} /> :
        <LessonEditor lesson={lesson} />
}

const mapState = (state, props) => {
    const lessonId = props.lessonId
    const {lessons} = state

    return {
        previewMode: state.app.previewMode,
        lesson: lessons.data[lessonId],
        loading: lessons.loading,
        error: lessons.error
    }
}

export default connect(mapState)(LessonDetail)