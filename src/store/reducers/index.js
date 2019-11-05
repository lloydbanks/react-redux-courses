import {ADD_ARTICLE, ERROR} from '../constants'

const initialState = {
    articles: [1, 2, 3]
}

function rootReducer(state = initialState, action) {
    if(action.type === ADD_ARTICLE) {
        return {...state, articles: [...state.articles, action.payload]}
    } else if(action.type === ERROR) {
        console.log('error', action.payload)

        return {...state, errors: action.payload}
    }

    return state
}

export default rootReducer