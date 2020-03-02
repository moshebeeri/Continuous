import React from 'react'
// import { BrowserRouter as Router } from 'react-router-dom'
// import Navigation from '../Navigation'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Firebase } from './firebase'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './redux/reducers'
import AppContext from './appContext'
import { composeWithDevTools } from 'redux-devtools-extension'

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
})

const store = createStore(rootReducer, {},  composeEnhancers(applyMiddleware(sagaMiddleware)))

store.subscribe(() => console.log(store.getState()))

/***
 * For firebase setup see:
 * https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial#react-application-setup-create-react-app
 */
ReactDOM.render(
  <Provider store={store}>
    <AppContext.Provider value={{firebase: new Firebase()}}>
      <App />
    </AppContext.Provider>
  </Provider>,
  document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
