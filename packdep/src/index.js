import React from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
//import Navigation from '../Navigation';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
//import Firebase, { FirebaseContext } from './firebase';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import rootReducer from './redux/reducers/rootReducer'
const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer,   applyMiddleware(sagaMiddleware))
/***
 * For firebase setup see:
 * https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial#react-application-setup-create-react-app
 */
ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
