import {ADD_ARTICLE, ERROR} from '../constants'

const forbiddenWords = ['spam', 'money']

export function forbiddenWordsMiddleware({dispatch}) {
    return next => {
        return action => {
            if(action.type === ADD_ARTICLE) {
                if(forbiddenWords.includes(action.article)) {
                    return dispatch({type: ERROR, payload: 'bad word'})
                }
            }

            return next(action)
        }
    }
}