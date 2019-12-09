import React from 'react'
import 'firebase/firestore'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Link } from '@reach/router'
import Modal from 'react-modal'
import AddForm from './add'
import {
  openAddCourseModal,
  closeAddCourseModal,
  deleteCourse
} from '../../store/actions'

const CourseList = ({
  courses,
  error,
  loading,
  openAddCourseModal,
  closeAddCourseModal,
  deleteCourse,
  isOpen
}) => {
  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-danger">Error: {error.message}</div>

  return !courses.length ? (
    <AddForm />
  ) : (
    <div>
      <h1>Courses List</h1>

      <div className="list-group mb-2">
        {courses.map(course => (
          <div
            className="list-group-item d-flex justify-content-between list-group-item-action"
            key={course.id}
          >
            <Link
              to={`/courses/${course.id}`}
              className="text-muted text-decoration-none w-100"
            >
              <h5 className="mb-1">{course.title}</h5>
              <small>Price: ${course.price}</small>
            </Link>

            <a
              href="#deleteCourse"
              className="text-danger text-decoration-none"
              onClick={e => {
                e.preventDefault()

                deleteCourse(course)
              }}
            >
              <span className="badge badge-danger">Delete course</span>
            </a>
          </div>
        ))}
      </div>

      <button className="btn btn-primary" onClick={openAddCourseModal}>
        New course
      </button>

      <Modal isOpen={isOpen} onRequestClose={closeAddCourseModal}>
        <AddForm />
      </Modal>
    </div>
  )
}

const mapState = ({ courses }) => ({
  courses: Object.values(courses.data),
  error: courses.error,
  loading: courses.loading,
  isOpen: courses.addCourseModalOpen
})

const mapDispatch = { openAddCourseModal, closeAddCourseModal, deleteCourse }

export default compose(
  firestoreConnect(() => ['courses']),
  connect(mapState, mapDispatch)
)(CourseList)
