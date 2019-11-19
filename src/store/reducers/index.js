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
    REMOVE_TODO,
    ENABLE_TODO,
    EDIT_TODO,
    SELECT_TODO,
    INCREMENT,
    DECREMENT
} from '../constants'

import {combineReducers} from 'redux'
import produce from 'immer'

const courses = produce((draft, action) => {
    switch(action.type) {
        case GET_COURSES_BEGIN:
            draft.loading = true
            draft.error = false

            break
        case GET_COURSES_SUCCESS:
            draft.courses = action.payload
            draft.loading = false

            break
        case GET_COURSES_ERROR:
            draft.loading = false
            draft.error = action.error

            break
        case OPEN_ADD_COURSE_MODAL:
            draft.addCourseModalOpen = true

            break
        case CLOSE_ADD_COURSE_MODAL:
            draft.addCourseModalOpen = false

            break
        case ADD_COURSE_BEGIN:
            draft.formLoading = true
            draft.formError = false

            break
        case ADD_COURSE_SUCCESS:
            draft.courses.push(action.payload)
            draft.loading = false
            draft.addCourseModalOpen = false
            draft.formLoading = false

            break
        case ADD_COURSE_ERROR:
            draft.formLoading = false
            draft.formError = action.error

            break
        case ADD_LESSON_SUCCESS:
            draft.lessons.push(action.payload)
            draft.lessonsLoading = false
            draft.lessonsError = false

            break
        default:
            return
    }
}, {courses: [], lessons: [], loading: false, error: null, formLoading: false, formError: null, addCourseModalOpen: false})

function articles(state = {data: [], isLoading: false, error: null}, action) {
    switch(action.type) {
        case 'GET_ARTICLES_SUCCESS':
            return {
                ...state,
                data: action.articles.splice(0, 10),
                isLoading: false
            }
        case 'GET_ARTICLES_START':
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case 'GET_ARTICLES_ERROR':
            return {
                ...state,
                data: [],
                isLoading: false,
                error: action.error
            }
        default:
            return state
    }
}

function todos(state = [{id: 0, text: 'test', disabled: true}], action = {}) {
    switch(action.type) {
        case ADD_TODO:
            return [...state, {id: Math.random(), text: action.text, completed: false, disabled: true}]
        case REMOVE_TODO:
            return state.filter(todo => todo.id !== action.id)
        case ENABLE_TODO:
            return state.map(todo => {
                if(todo.id === action.id) return {...todo, disabled: false}

                return todo
            })
        case EDIT_TODO:
            return state.map(todo => {
                if(todo.id === action.id) return {...todo, text: action.text}

                return todo
            })
        case 'COMPLETE_TODO':
            return state.map((todo, index) => {
                if(index === action.index) {
                    return Object.assign({}, todo, {
                        completed: true
                    })
                }

                return todo
            })
        default:
            return state
    }
}

const initialTodosObject = {
    selected: null,
    data: {
        0: {id: 0, text: 'test', disabled: true}
    }
}

const todosObject = produce((draft, action) => {
    let i = parseInt(Object.keys(draft.data).slice(-1)) + 1 || 0

    return (() => {
        switch(action.type) {
            case ADD_TODO:
                draft.data[i] = {id: Math.random(), text: action.text, disabled: true}
                break
            case REMOVE_TODO:
                delete draft.data[action.index]
                break
            case ENABLE_TODO:
                draft.data[action.index].disabled = !draft.data[action.index].disabled
                break
            case EDIT_TODO:
                draft.data[action.index].text = action.text
                break
            case SELECT_TODO:
                draft.selected = action.todo
                break
            default:
                return
        }
    })()
}, initialTodosObject)

function counter(state = 0, action) {
    switch (action.type) {
        case INCREMENT:
            return state + 1
        case DECREMENT:
            return state - 1
        default:
            return state
    }
}

function error(state = null, action) {
    switch (action.type) {
        case 'ERROR':
            state = action.text
            return state
        case 'REMOVE_ERROR':
            state = null
            return state
        default:
            return state
    }
}

const rootReducer = combineReducers({courses, articles, todos, todosObject, counter, error})
export default rootReducer