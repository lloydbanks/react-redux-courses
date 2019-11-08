import React from 'react'
import {connect} from 'react-redux'
import Form from './add'
import {removeToDo, editToDo, enableToDo} from '../../store/actions'

const mapStateToProps = ({todos}) => ({todos})

function Todo(props) {
    const remove = id => props.dispatch(removeToDo(id))
    const enable = id => props.dispatch(enableToDo(id))
    const edit = (e, id) => props.dispatch(editToDo({id, text: e.target.value}))

    const list = props.todos.map(todo => {
        const {id, text} = todo

        return (
            <li key={id}>
                <input type="text" value={text} onChange={e => edit(e, id)} disabled={todo.disabled} />
                <span onClick={() => enable(id)}>Edit</span> | <span onClick={e => remove(id)}>Delete</span>
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

export default connect(mapStateToProps)(Todo)