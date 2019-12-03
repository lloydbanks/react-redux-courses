import React, {useState, useRef, useEffect} from 'react'
import {connect} from 'react-redux'
import {deleteLesson} from '../../store/actions'

const Lesson = ({onSubmit, lesson, deleteLesson, children}) => {
    const initialValue = lesson ? lesson.title : ''
    const [editing, setEditing] = useState(false)
    const [title, setTitle] = useState(initialValue)
    const inputRef = useRef()

    useEffect(() => {
        if(editing) inputRef.current.focus()
    }, [editing])

    const reset = () => {
        setTitle(initialValue)
        setEditing(false)
    }

    const editLesson = e => {
        e.preventDefault()

        onSubmit(title)
        inputRef.current.focus()
        reset()
    }

    const handleEdit = () => setEditing(true)
    const handleDelete = () => deleteLesson(lesson)

    return editing ? (
        <>
            <form className="mt-1" onSubmit={editLesson}>
                <div className="form-group">
                    <input type="text"
                           className="form-control"
                           value={title}
                           onChange={e => setTitle(e.target.value)}
                           onBlur={reset}
                           placeholder="Enter lesson title"
                           ref={inputRef}
                    />
                </div>
            </form>
        </>
    ) : (
            children(handleEdit, handleDelete)
        )
}

export default connect(null, {deleteLesson})(Lesson)