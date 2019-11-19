import {ADD_LESSON_SUCCESS} from '../constants'
import produce from 'immer'

const reducer = produce((draft, action) => {
    switch(action.type) {
        case ADD_LESSON_SUCCESS:
            draft.data.push(action.payload)

            break
        default:
            return
    }
}, {data: [], lessonsLoading: false, lessonsError: null})

export default reducer