import {ADD_ARTICLE, INCREMENT, DECREMENT} from '../constants'

function addArticle(article) {
    return {
        type: ADD_ARTICLE,
        article
    }
}

function increment() {
    return {
        type: INCREMENT
    }
}

function decrement() {
    return {
        type: DECREMENT
    }
}

export {addArticle, increment, decrement}