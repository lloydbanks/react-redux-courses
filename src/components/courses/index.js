import React from 'react'
import 'firebase/firestore'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Link } from '@reach/router'
import Modal from 'react-modal'
import AddForm from './add'
import { openAddCourseModal, closeAddCourseModal } from '../../store/actions'

const CourseList = ({
  courses,
  error,
  loading,
  openAddCourseModal,
  closeAddCourseModal,
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
          <Link
            to={`/courses/${course.id}`}
            className="list-group-item list-group-item-action"
            key={course.id}
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{course.title}</h5>
            </div>
            <small>Price: ${course.price}</small>
          </Link>
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
  courses: courses.data,
  error: courses.error,
  loading: courses.loading,
  isOpen: courses.addCourseModalOpen
})

const mapDispatch = { openAddCourseModal, closeAddCourseModal }

export default compose(
  firestoreConnect(() => ['courses']),
  connect(mapState, mapDispatch)
)(CourseList)
