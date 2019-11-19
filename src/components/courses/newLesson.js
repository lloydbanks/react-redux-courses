import React, {useState, useRef, useEffect} from 'react'
import {connect} from 'react-redux'
import {addLesson} from '../../store/actions'

const NewLesson = ({lessons, addLesson, courseId}) => {
    const [editing, setEditing] = useState(false)
    const [title, setTitle] = useState('')
    const inputRef = useRef()

    useEffect(() => {
        if(editing) inputRef.current.focus()
    }, [editing])

    const reset = () => {
        setTitle('')
        setEditing(false)
    }

    const handleSubmit = e => {
        e.preventDefault()

        addLesson(title, courseId)
        inputRef.current.focus()
        reset()
    }

    return editing ? (
        <>
            <form className="mt-1" onSubmit={handleSubmit}>
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
            <button className="btn btn-success" onClick={() => setEditing(true)}>Add new lesson</button>
        )
}

export default connect(null,{addLesson})(NewLesson)