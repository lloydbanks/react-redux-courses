import {combineReducers} from 'redux'
import {ADD_TODO, REMOVE_TODO, ENABLE_TODO, EDIT_TODO, SELECT_TODO, INCREMENT} from '../constants'

function visibilityFilter(state = 'SHOW_ALL', action = {}) {
    if(action.type === 'SET_VISIBILITY_FILTER') return action.filter

    return state
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

function todosObject(state = initialTodosObject, action = {}) {
    let i = parseInt(Object.keys(state.data).slice(-1)) + 1 || 0

    return (() => {
        switch(action.type) {
            case ADD_TODO:
                const newState = {...state}
                newState['data'][i] = {id: Math.random(), text: action.text, disabled: true}

                return newState
            case REMOVE_TODO:
                const copy = {
                    ...state,
                    data: {
                        ...state.data
                    }
                }
                delete copy.data[action.index]

                return copy
            case ENABLE_TODO:
                return {
                    ...state,
                    data: {
                        ...state.data,
                        [action.index]: {
                            ...state.data[action.index],
                            disabled: !state.data[action.index].disabled
                        }
                    }
                }
            case EDIT_TODO:
                return {
                    ...state,
                    data: {
                        ...state.data,
                        [action.index]: {
                            ...state.data[action.index],
                            text: action.text
                        }
                    }
                }
            case SELECT_TODO:
                return {...state, selected: action.todo}
            default:
                return state
        }
    })()
}

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

const rootReducer = combineReducers({visibilityFilter, todos, todosObject, counter, error})
export default rootReducer