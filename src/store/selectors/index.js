import {createSelector} from 'reselect'

const getLessons = state => state.lessons.data
const parseCourseId = (state, props) => parseInt(props.id)

export const getLessonsByCourse = createSelector(
    getLessons,
    parseCourseId,
    (lessons, courseId) => lessons.filter(
        lesson => +lesson.courseId === courseId
    )
)

