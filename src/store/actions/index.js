import {ADD_ARTICLE, ERROR} from '../constants'

export function addArticle(article) {
    return {
        type: ADD_ARTICLE,
        payload: article
    }
}

export function addError(error) {
    return {
        type: ERROR,
        payload: error
    }
}