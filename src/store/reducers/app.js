import { TOGGLE_PREVIEW_MODE } from '../constants'
import produce from 'immer'

const initialState = { previewMode: false }
const reducer = produce((draft, action) => {
  switch (action.type) {
    case TOGGLE_PREVIEW_MODE:
      draft.previewMode = !draft.previewMode
      break
    default:
      return
  }
}, initialState)

export default reducer
