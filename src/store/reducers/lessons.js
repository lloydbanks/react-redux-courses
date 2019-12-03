import {
    ADD_LESSON_BEGIN,
    ADD_LESSON_SUCCESS,
    ADD_LESSON_ERROR,
    GET_LESSONS_BEGIN,
    GET_LESSONS_SUCCESS,
    GET_LESSONS_ERROR,
    SAVE_LESSON_BEGIN,
    SAVE_LESSON_SUCCESS,
    SAVE_LESSON_ERROR,
    DELETE_LESSON_SUCCESS,
} from '../constants'
import produce from 'immer'

const reducer = produce((draft, action) => {
    switch(action.type) {
        case ADD_LESSON_BEGIN:
        case SAVE_LESSON_BEGIN:
            draft.saving = true
            draft.error = null

            break
        case ADD_LESSON_SUCCESS:
        case SAVE_LESSON_SUCCESS:
            const {payload} = action
            draft.saving = false
            draft.data[payload.id] = payload

            break
        case ADD_LESSON_ERROR:
        case SAVE_LESSON_ERROR:
            draft.loading = false
            draft.error = action.error

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
        case DELETE_LESSON_SUCCESS:
            draft.loading = false
            draft.error = null
            delete draft.data[action.payload.id]

            break
        default:
            return
    }
}, {data: {}, loading: false, error: null, saving: false})

export default reducer