import React, {useState} from 'react'
import {connect} from 'react-redux'

const CourseList = ({courses, dispatch}) => {
    const [title, setTitle] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch({
            type: 'ADD_COURSE',
            payload: {id: Math.random(), title}
        })
    }

    return (
        !courses.length ? (
            <div>
                <h1>Create your first Course</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Enter title:</label>
                        <input className="form-control" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <button className="btn btn-primary" type="submit">Create course</button>
                </form>
            </div>
        ) : (
            <div>
                <h1>Courses List</h1>

                <ul>
                    {courses.map(course => (
                        <li key={course.id}>{course.title}</li>
                    ))}
                </ul>
            </div>
        )
    )
}

const mapState = ({courses}) => ({courses})

export default connect(mapState)(CourseList)