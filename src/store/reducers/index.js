import {combineReducers} from 'redux'
import {ADD_TODO, REMOVE_TODO, ENABLE_TODO, EDIT_TODO, SELECT_TODO, INCREMENT} from '../constants'
import produce from 'immer'

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
        }
    })()
}, initialTodosObject)

function counter(state = 0, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
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

const rootReducer = combineReducers({articles, todos, todosObject, counter, error})
export default rootReducer