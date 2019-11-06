import {ADD_ARTICLE, ERROR} from '../constants'

const initialState = {
    articles: [1, 2, 3],
    counter: 0
}

function rootReducer(state = initialState, action) {
    if(action.type === ADD_ARTICLE) {
        return {...state, articles: [...state.articles, action.payload]}
    } else if(action.type === ERROR) {
        console.log('error', action.payload)

        return {...state, errors: action.payload}
    } else if(action.type === 'INCREMENT') {
        return {...state, counter: state.counter + 1}
    } else if(action.type === 'DECREMENT') {
        return {...state, counter: state.counter - 1}
    }

    return state
}

export default rootReducer