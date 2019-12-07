import {
    GET_COURSES_BEGIN,
    GET_COURSES_SUCCESS,
    GET_COURSES_ERROR,
    ADD_COURSE_BEGIN,
    ADD_COURSE_SUCCESS,
    ADD_COURSE_ERROR,
    OPEN_ADD_COURSE_MODAL,
    CLOSE_ADD_COURSE_MODAL,
    GET_LESSONS_BEGIN,
    GET_LESSONS_SUCCESS,
    GET_LESSONS_ERROR,
    ADD_LESSON_BEGIN,
    ADD_LESSON_SUCCESS,
    ADD_LESSON_ERROR,
    DELETE_LESSON_BEGIN,
    DELETE_LESSON_SUCCESS,
    DELETE_LESSON_ERROR,
    SAVE_LESSON_BEGIN,
    SAVE_LESSON_SUCCESS,
    SAVE_LESSON_ERROR,
    SET_LESSON_MARKDOWN, TOGGLE_PREVIEW_MODE
} from '../constants'

import {fetchLessons, createLesson, updateLesson, removeLesson} from '../api'

import firebase from 'firebase/app'
import 'firebase/database'
import {fbConfig} from '../firebase/config'
firebase.initializeApp(fbConfig)
const db = firebase.firestore()

const getCourses = () => {
    return dispatch => {
        dispatch({type: GET_COURSES_BEGIN})

        db.collection('courses').orderBy('title').get()
            .then(snaps => {
                const courses = []
                snaps.forEach((snap) => {
                    courses.push({id: snap.id, ...snap.data()})
                })

                dispatch({type: GET_COURSES_SUCCESS, payload: courses})
            })
            .catch(error => {
                dispatch({type: GET_COURSES_ERROR, error})
            })
    }
}

const getLessons = (courseId) => {
    return dispatch => {
        dispatch({type: GET_LESSONS_BEGIN})

        db.collection('lessons').where('courseId', '==', courseId)
            .orderBy('title').get()
            .then(snaps => {
                const lessons = []
                snaps.forEach(snap => lessons.push({id: snap.id, ...snap.data()}))

                dispatch({type: GET_LESSONS_SUCCESS, payload: lessons})
            })
            .catch(error => {
                dispatch({type: GET_LESSONS_ERROR, error})
            })
    }
}

const addCourse = ({title, price}) => {
    return dispatch => {
        dispatch({type: ADD_COURSE_BEGIN})

        return db.collection('courses').add({title, price})
            .then(course => {
                dispatch({type: ADD_COURSE_SUCCESS, payload: {title, price, id: course.id}})
            })
            .catch(error => {
                dispatch({type: ADD_COURSE_ERROR, error})
            })
    }
}

const addLesson = ({title, courseId}) => {
    return dispatch => {
        dispatch({type: ADD_LESSON_BEGIN})

        return db.collection('lessons').add({title, courseId})
            .then(({id}) => {
                dispatch({type: ADD_LESSON_SUCCESS, payload: {id, title, courseId}})
            })
            .catch(error => {
                dispatch({type: ADD_LESSON_ERROR, error})
            })
    }
}

const saveLesson = (lesson) => {
    return dispatch => {
        dispatch({type: SAVE_LESSON_BEGIN})

        return db.collection('lessons').doc(lesson.id).set(lesson)
            .then(lesson => {
                dispatch({type: SAVE_LESSON_SUCCESS, payload: lesson})
            })
            .catch(error => {
                dispatch({type: SAVE_LESSON_ERROR, error})
            })
    }
}

let saveTimer = null
const setLessonMarkdown = (lesson, markdown) => {
    return (dispatch, getState) => {
        dispatch({
            type: SET_LESSON_MARKDOWN,
            payload: {
                lesson, markdown
            }
        })

        if(saveTimer) clearTimeout(saveTimer)
        saveTimer = setTimeout(() => {
            const latest = getState().lessons.data[lesson.id]
            dispatch(saveLesson(latest))
        }, 1000)
    }
}

const deleteLesson = (lesson) => {
    return dispatch => {
        dispatch({type: DELETE_LESSON_BEGIN})

        return db.collection('lessons').doc(lesson.id).delete()
            .then(() => {
                dispatch({type: DELETE_LESSON_SUCCESS, payload: lesson})
            })
            .catch(error => {
                dispatch({type: DELETE_LESSON_ERROR, error})
            })
    }
}

const openAddCourseModal = () => ({
    type: OPEN_ADD_COURSE_MODAL
})

const closeAddCourseModal = () => ({
    type: CLOSE_ADD_COURSE_MODAL
})

const togglePreviewMode = () => ({
    type: TOGGLE_PREVIEW_MODE
})

export {
    getCourses,
    getLessons,
    addCourse,
    addLesson,
    saveLesson,
    setLessonMarkdown,
    deleteLesson,
    openAddCourseModal,
    closeAddCourseModal,
    togglePreviewMode
}