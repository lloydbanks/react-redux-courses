import { createSelector } from 'reselect'

const getLessons = state => Object.values(state.lessons.data)
const getCourses = state => state.courses.data
const parseCourseId = (state, props) => props.id

export const getLessonsByCourse = createSelector(
  getLessons,
  parseCourseId,
  (lessons, courseId) => lessons.filter(lesson => lesson.courseId === courseId)
)

export const getCourseById = createSelector(
  getCourses,
  parseCourseId,
  (courses, courseId) => courses[courseId]
)
