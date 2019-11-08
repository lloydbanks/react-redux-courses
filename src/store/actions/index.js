import {ADD_TODO, EDIT_TODO, REMOVE_TODO, ENABLE_TODO, SELECT_TODO, INCREMENT, DECREMENT} from '../constants'

function increment() {
    return {type: INCREMENT}
}

function decrement() {
    return {type: DECREMENT}
}

function addToDo(todo) {
    return {type: ADD_TODO, text: todo}
}

function removeToDo(index) {
    return {type: REMOVE_TODO, index}
}

function editToDo({index, text}) {
    return {type: EDIT_TODO, index, text}
}

function enableToDo(index) {
    return {type: ENABLE_TODO, index}
}

function selectToDo(todo) {
    return {type: SELECT_TODO, todo}
}

export {addToDo, editToDo, removeToDo, enableToDo, selectToDo, increment, decrement}