import React, { useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import { addCourse } from '../../store/actions'

function Add({ dispatch, hasCourses, loading, error }) {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const inputRef = useRef()

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const handleSubmit = e => {
    e.preventDefault()

    dispatch(addCourse({ title, price }))
  }

  return (
    <form onSubmit={handleSubmit}>
      {!hasCourses ? (
        <h1>Create your first Course</h1>
      ) : (
        <h1>Add new course</h1>
      )}

      <div className="form-group">
        <label>Enter title:</label>
        <input
          className="form-control"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          ref={inputRef}
        />
      </div>

      <label>Enter price:</label>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">$</span>
        </div>
        <input
          className="form-control"
          type="text"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
      </div>

      <button className="btn btn-primary" type="submit" disabled={loading}>
        Create course
      </button>

      {error ? <p className="text-danger">Error: {error.message}</p> : null}
    </form>
  )
}

const mapState = ({ courses }) => ({
  hasCourses: courses.data.length,
  loading: courses.formLoading,
  error: courses.formError
})

export default connect(mapState)(Add)
