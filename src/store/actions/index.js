import {ADD_TODO, EDIT_TODO, REMOVE_TODO, ENABLE_TODO, INCREMENT, DECREMENT} from '../constants'

function increment() {
    return {type: INCREMENT}
}

function decrement() {
    return {type: DECREMENT}
}

function addToDo(todo) {
    return {type: ADD_TODO, text: todo}
}

function removeToDo(id) {
    return {type: REMOVE_TODO, id}
}

function editToDo({id, text}) {
    return {type: EDIT_TODO, id, text}
}

function enableToDo(id) {
    return {type: ENABLE_TODO, id}
}

export {addToDo, editToDo, removeToDo, enableToDo, increment, decrement}