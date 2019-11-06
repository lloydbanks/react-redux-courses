import {ADD_ARTICLE} from '../constants'
import {combineReducers} from 'redux'

function visibilityFilter(state = 'SHOW_ALL', action = {}) {
    if(action.type === 'SET_VISIBILITY_FILTER') return action.filter

    return state
}

function todos(state = [], action = {}) {
    switch(action.type) {
        case 'ADD_TODO':
            return [...state, {text: action.text, completed: false}]
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

function articles(state = [], action) {
    switch (action.type) {
        case ADD_ARTICLE:
            return [...state, action.article]
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

const rootReducer = combineReducers({visibilityFilter, todos, counter, articles, error})
export default rootReducer

/*
const initialState = {
    articles: [1, 2, 3],
    counter: 0,
}

function rootReducer(state = initialState, action) {
    if(action.type === ADD_ARTICLE) {
        return {...state, articles: [...state.articles, action.payload]}
    } else if(action.type === ERROR) {
        return {...state, errors: action.payload}
    } else if(action.type === 'INCREMENT') {
        return {...state, counter: state.counter + 1}
    } else if(action.type === 'DECREMENT') {
        return {...state, counter: state.counter - 1}
    }

    return state
}
*/