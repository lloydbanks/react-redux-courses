import React from 'react'
import {connect} from 'react-redux'
import LessonEditor from './editor'
import NotFoundPage from '../404'
import ReactMarkdown from 'react-markdown'

const LessonDetail = ({lesson, loading, previewMode}) => {
    if(loading) return <div>Loading...</div>
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
        loading: lessons.loading
    }
}

export default connect(mapState)(LessonDetail)