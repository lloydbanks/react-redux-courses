import {
  GET_COURSES_BEGIN,
  GET_COURSES_SUCCESS,
  GET_COURSES_ERROR,
  ADD_COURSE_BEGIN,
  ADD_COURSE_SUCCESS,
  ADD_COURSE_ERROR,
  OPEN_ADD_COURSE_MODAL,
  CLOSE_ADD_COURSE_MODAL,
  GET_LESSONS_BEGIN,
  GET_LESSONS_SUCCESS,
  GET_LESSONS_ERROR,
  ADD_LESSON_BEGIN,
  ADD_LESSON_SUCCESS,
  ADD_LESSON_ERROR,
  DELETE_LESSON_BEGIN,
  DELETE_LESSON_SUCCESS,
  DELETE_LESSON_ERROR,
  SAVE_LESSON_BEGIN,
  SAVE_LESSON_SUCCESS,
  SAVE_LESSON_ERROR,
  SET_LESSON_MARKDOWN,
  TOGGLE_PREVIEW_MODE
} from '../constants'

import {
  fetchCourses,
  fetchLessons,
  createCourse,
  createLesson,
  updateLesson,
  removeLesson
} from '../api'

const getCourses = () => {
  return dispatch => {
    dispatch({ type: GET_COURSES_BEGIN })

    fetchCourses()
      .then(courses => {
        dispatch({ type: GET_COURSES_SUCCESS, payload: courses })
      })
      .catch(error => {
        dispatch({ type: GET_COURSES_ERROR, error })
      })
  }
}

const getLessons = courseId => {
  return dispatch => {
    dispatch({ type: GET_LESSONS_BEGIN })

    fetchLessons(courseId)
      .then(lessons => {
        dispatch({ type: GET_LESSONS_SUCCESS, payload: lessons })
      })
      .catch(error => {
        dispatch({ type: GET_LESSONS_ERROR, error })
      })
  }
}

const addCourse = ({ title, price }) => {
  return dispatch => {
    dispatch({ type: ADD_COURSE_BEGIN })

    createCourse({ title, price })
      .then(course => {
        dispatch({ type: ADD_COURSE_SUCCESS, payload: course })
      })
      .catch(error => {
        dispatch({ type: ADD_COURSE_ERROR, error })
      })
  }
}

const addLesson = ({ title, courseId }) => {
  return dispatch => {
    dispatch({ type: ADD_LESSON_BEGIN })

    createLesson({ title, courseId })
      .then(course => {
        dispatch({ type: ADD_LESSON_SUCCESS, payload: course })
      })
      .catch(error => {
        dispatch({ type: ADD_LESSON_ERROR, error })
      })
  }
}

const saveLesson = lesson => {
  return dispatch => {
    dispatch({ type: SAVE_LESSON_BEGIN })

    return updateLesson(lesson)
      .then(lesson => {
        dispatch({ type: SAVE_LESSON_SUCCESS, payload: lesson })
      })
      .catch(error => {
        dispatch({ type: SAVE_LESSON_ERROR, error })
      })
  }
}

let saveTimer = null
const setLessonMarkdown = (lesson, markdown) => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_LESSON_MARKDOWN,
      payload: {
        lesson,
        markdown
      }
    })

    if (saveTimer) clearTimeout(saveTimer)
    saveTimer = setTimeout(() => {
      const latest = getState().lessons.data[lesson.id]
      dispatch(saveLesson(latest))
    }, 1000)
  }
}

const deleteLesson = lesson => {
  return dispatch => {
    dispatch({ type: DELETE_LESSON_BEGIN })

    return removeLesson(lesson)
      .then(() => {
        dispatch({ type: DELETE_LESSON_SUCCESS, payload: lesson })
      })
      .catch(error => {
        dispatch({ type: DELETE_LESSON_ERROR, error })
      })
  }
}

const openAddCourseModal = () => ({
  type: OPEN_ADD_COURSE_MODAL
})

const closeAddCourseModal = () => ({
  type: CLOSE_ADD_COURSE_MODAL
})

const togglePreviewMode = () => ({
  type: TOGGLE_PREVIEW_MODE
})

export {
  getCourses,
  getLessons,
  addCourse,
  addLesson,
  saveLesson,
  setLessonMarkdown,
  deleteLesson,
  openAddCourseModal,
  closeAddCourseModal,
  togglePreviewMode
}
