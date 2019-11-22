import {createSelector} from 'reselect'

const getLessons = state => state.lessons.data
const getCourses = state => state.courses.data
const parseCourseId = (state, props) => parseInt(props.id)

export const getLessonsByCourse = createSelector(
    getLessons,
    lessons => Object.values(lessons).sort((a, b) => {
        if(a.id < b.id) {
            return -1
        } else if (a.id > b.id) {
            return 1
        } else {
            return 0
        }
    })
)

export const getCourseById = createSelector(
    getCourses,
    parseCourseId,
    (courses, courseId) => courses.find(
        course => +course.id === courseId
    )
)

