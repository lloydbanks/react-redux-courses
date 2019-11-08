import React from 'react'
import {connect} from 'react-redux'
import Form from './add'
import {removeToDo, editToDo, enableToDo, selectToDo} from '../../store/actions'

const mapStateToProps = state => ({
    todos: state.todosObject.data,
    keys: Object.keys(state.todosObject.data),
    selected: state.todosObject.selected
})

const mapDispatchToProps = {editToDo, enableToDo, removeToDo, selectToDo}

function TodoObject({todos, keys, selectToDo, selected, editToDo, enableToDo, removeToDo}) {
    const list = keys.map(index => {
        const todo = todos[index]
        const {id, text, disabled} = todo

        return (
            <li key={id}>
                <div style={todo === selected ? {outline: '1px solid red'} : null}>
                    <input type="text" value={text} onChange={(e) => editToDo({index, text: e.target.value})} disabled={todo.disabled} />
                    <button onClick={() => enableToDo(index)}>{disabled ? 'Enable' : 'Disable'}</button>
                    <button onClick={() => removeToDo(index)}>Delete</button>
                    <button onClick={() => selectToDo(todo)}> Select</button>
                </div>
            </li>
        )
    })

    return (
        <div>
            <h3>Todo list</h3>
            <ul>{list}</ul>

            <h3>Add todo</h3>
            <Form />
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoObject)