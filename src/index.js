import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import * as serviceWorker from './serviceWorker'
import Modal from 'react-modal'

// store
import rootReducer from './store/reducers'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { getCourses } from './store/actions'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'
import { rrfConfig } from './store/firebase/config'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middlewares = [thunk.withExtraArgument(getFirebase)]
const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(...middlewares))
)
const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
}

store.dispatch(getCourses())

Modal.setAppElement('#root')
ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister()
