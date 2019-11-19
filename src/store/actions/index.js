import {
    GET_COURSES_BEGIN,
    GET_COURSES_SUCCESS,
    GET_COURSES_ERROR,
    ADD_COURSE_BEGIN,
    ADD_COURSE_SUCCESS,
    ADD_COURSE_ERROR,
    OPEN_ADD_COURSE_MODAL,
    CLOSE_ADD_COURSE_MODAL,
    ADD_LESSON_BEGIN,
    ADD_LESSON_SUCCESS,
    ADD_LESSON_ERROR,
    ADD_TODO,
    EDIT_TODO,
    REMOVE_TODO,
    ENABLE_TODO,
    SELECT_TODO,
    INCREMENT,
    DECREMENT
} from '../constants'

import {fetchCourses, createCourse, createLesson} from '../api'

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

function getArticles() {
    return (dispatch, getState) => {
        dispatch({type: 'GET_ARTICLES_START'})

        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(data => data.json())
            .then(articles => {
                setTimeout(() => {
                    dispatch({
                        type: 'GET_ARTICLES_SUCCESS',
                        articles: articles
                    })
                }, 1000)
            })
            .catch(error => {
                console.log('error', error)
                dispatch(err => ({type: 'GET_ARTICLES_ERROR', error}))
            })
    }
}

function increment() {
    return {type: INCREMENT}
}

function decrement() {
    return {type: DECREMENT}
}

function addToDo(todo) {
    return {type: ADD_TODO, text: todo}
}

function removeToDo(index) {
    return {type: REMOVE_TODO, index}
}

function editToDo({index, text}) {
    return {type: EDIT_TODO, index, text}
}

function enableToDo(index) {
    return {type: ENABLE_TODO, index}
}

function selectToDo(todo) {
    return {type: SELECT_TODO, todo}
}

export {
    getCourses,
    addCourse,
    addLesson,
    openAddCourseModal,
    closeAddCourseModal,
    getArticles,
    addToDo,
    editToDo,
    removeToDo,
    enableToDo,
    selectToDo,
    increment,
    decrement
}