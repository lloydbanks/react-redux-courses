import { ADD_TODO, FORBIDDEN_WORDS, ERROR, REMOVE_ERROR } from '../constants'

export function forbiddenWordsMiddleware({ getState, dispatch }) {
  return next => {
    return action => {
      if (action.type === ADD_TODO) {
        if (FORBIDDEN_WORDS.includes(action.article)) {
          return dispatch({ type: ERROR, text: 'Bad word!' })
        } else if (getState().error) {
          dispatch({ type: REMOVE_ERROR })
        }
      }

      return next(action)
    }
  }
}
