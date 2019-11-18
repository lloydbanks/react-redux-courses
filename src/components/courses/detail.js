import React from 'react'
import {connect} from 'react-redux'
import NotFound from '../404'
import {Link} from '@reach/router'

const CourseDetail = ({id, course, loading}) => {
    if(loading) return <div>Loading...</div>
    if(!course) return <NotFound />

    return (
        <div className="card mb-3">
            <div className="row no-gutters">
                <div className="col-md-12">
                    <div className="card-body">
                        <h5 className="card-title">{course.title}</h5>
                        <p className="card-text">Price: ${course.price}</p>
                        <Link to="/courses" className="btn btn-primary">View all</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapState = (state, props) => {
    return {
        loading: state.courses.loading,
        course: state.courses.courses.find(
            c => c.id === +props.id
        )
    }
}

export default connect(mapState)(CourseDetail)