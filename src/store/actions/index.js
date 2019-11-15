import {
    ADD_COURSE_BEGIN,
    ADD_COURSE_SUCCESS,
    ADD_COURSE_ERROR,
    ADD_TODO,
    EDIT_TODO,
    REMOVE_TODO,
    ENABLE_TODO,
    SELECT_TODO,
    INCREMENT,
    DECREMENT
} from '../constants'

import createCourse from '../api'

const addCourse = title => {
    return dispatch => {
        dispatch({type: ADD_COURSE_BEGIN})

        createCourse(title)
            .then(course => {
                dispatch({type: ADD_COURSE_SUCCESS, payload: course})
            })
            .catch(error => {
                dispatch({type: ADD_COURSE_ERROR, error})
            })
    }
}

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
    addCourse,
    getArticles,
    addToDo,
    editToDo,
    removeToDo,
    enableToDo,
    selectToDo,
    increment,
    decrement
}