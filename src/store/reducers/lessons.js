import {
    ADD_LESSON_SUCCESS,
    GET_LESSONS_BEGIN,
    GET_LESSONS_SUCCESS,
    GET_LESSONS_ERROR,
} from '../constants'
import produce from 'immer'

const reducer = produce((draft, action) => {
    switch(action.type) {
        case ADD_LESSON_SUCCESS:
            const {payload} = action
            draft.data[payload.id] = payload

            break
        case GET_LESSONS_BEGIN:
            draft.loading = true
            draft.error = null

            break
        case GET_LESSONS_SUCCESS:
            action.payload.forEach(lesson => {
                draft.data[lesson.id] = lesson
            })
            draft.loading = false
            draft.error = null

            break
        case GET_LESSONS_ERROR:
            draft.loading = false
            draft.error = action.error

            break
        default:
            return
    }
}, {data: {}, lessonsLoading: false, lessonsError: null})

export default reducer