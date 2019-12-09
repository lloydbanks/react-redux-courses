import {
  GET_COURSES_BEGIN,
  GET_COURSES_SUCCESS,
  GET_COURSES_ERROR,
  ADD_COURSE_BEGIN,
  ADD_COURSE_SUCCESS,
  ADD_COURSE_ERROR,
  DELETE_COURSE_BEGIN,
  DELETE_COURSE_SUCCESS,
  DELETE_COURSE_ERROR,
  OPEN_ADD_COURSE_MODAL,
  CLOSE_ADD_COURSE_MODAL
} from '../constants'

import produce from 'immer'

const reducer = produce(
  (draft, action) => {
    switch (action.type) {
      case GET_COURSES_BEGIN:
        draft.loading = true
        draft.error = false

        break
      case GET_COURSES_SUCCESS:
        action.payload.forEach(course => {
          draft.data[course.id] = course
        })
        draft.loading = false

        break
      case GET_COURSES_ERROR:
        draft.loading = false
        draft.error = action.error

        break
      case OPEN_ADD_COURSE_MODAL:
        draft.addCourseModalOpen = true

        break
      case CLOSE_ADD_COURSE_MODAL:
        draft.addCourseModalOpen = false

        break
      case ADD_COURSE_BEGIN:
        draft.formLoading = true
        draft.formError = false

        break
      case ADD_COURSE_SUCCESS:
        const { payload } = action
        draft.data[payload.id] = payload

        draft.loading = false
        draft.addCourseModalOpen = false
        draft.formLoading = false

        break
      case ADD_COURSE_ERROR:
        draft.formLoading = false
        draft.formError = action.error

        break
      case DELETE_COURSE_BEGIN:
        draft.formLoading = true
        draft.formError = false

        break
      case DELETE_COURSE_SUCCESS:
        delete draft.data[action.payload.id]
        draft.loading = false
        draft.formLoading = false

        break
      case DELETE_COURSE_ERROR:
        draft.formLoading = false
        draft.formError = action.error

        break
      default:
        return
    }
  },
  {
    data: {},
    loading: false,
    error: null,
    formLoading: false,
    formError: null,
    addCourseModalOpen: false
  }
)

export default reducer
