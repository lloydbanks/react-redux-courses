import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import * as serviceWorker from './serviceWorker'

// store
import rootReducer from './store/reducers'
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import {forbiddenWordsMiddleware} from './store/middleware'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(forbiddenWordsMiddleware))
)

// temp dev
window.store = store

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))

serviceWorker.unregister()
