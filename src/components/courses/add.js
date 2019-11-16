import React, {useState, useRef, useEffect} from 'react'
import {connect} from 'react-redux'
import {addCourse} from '../../store/actions'

function Add({dispatch, loading, error}) {
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const inputRef = useRef()

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    const handleSubmit = e => {
        e.preventDefault()

        dispatch(addCourse({title, price}))
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Enter title:</label>
                <input className="form-control" type="text" value={title}
                       onChange={(e) => setTitle(e.target.value)} ref={inputRef} />
            </div>

            <label>Enter price:</label>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">$</span>
                </div>
                <input className="form-control" type="text" value={price}
                       onChange={(e) => setPrice(e.target.value)} disabled={loading} />
            </div>

            <button className="btn btn-primary" type="submit">Create course</button>

            {error ? <p>Error: {error}</p> : null}
        </form>
    )
}

const mapState = ({courses}) => ({
    loading: courses.loadingSave,
    error: courses.error
})

export default connect(mapState)(Add)