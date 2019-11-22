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
} from '../constants'

import {fetchCourses, fetchLessons, createCourse, createLesson} from '../api'

const getCourses = () => {
    return dispatch => {
        dispatch({type: GET_COURSES_BEGIN})

        fetchCourses()
            .then(courses => {
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

        fetchLessons(courseId)
            .then(lessons => {
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

        createCourse({title, price})
            .then(course => {
                dispatch({type: ADD_COURSE_SUCCESS, payload: course})
            })
            .catch(error => {
                dispatch({type: ADD_COURSE_ERROR, error})
            })
    }
}

const addLesson = ({title, courseId}) => {
    return dispatch => {
        dispatch({type: ADD_LESSON_BEGIN})

        createLesson({title, courseId})
            .then(course => {
                dispatch({type: ADD_LESSON_SUCCESS, payload: course})
            })
            .catch(error => {
                dispatch({type: ADD_LESSON_ERROR, error})
            })
    }
}

const openAddCourseModal = () => ({
    type: OPEN_ADD_COURSE_MODAL
})

const closeAddCourseModal = () => ({
    type: CLOSE_ADD_COURSE_MODAL
})

export {
    getCourses,
    getLessons,
    addCourse,
    addLesson,
    openAddCourseModal,
    closeAddCourseModal,
}