import {ADD_ARTICLE, ERROR} from '../constants'

export function addArticle(article) {
    return {
        type: ADD_ARTICLE,
        article
    }
}