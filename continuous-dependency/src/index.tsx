import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
//import Navigation from '../Navigation';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Firebase, { FirebaseContext } from './firebase';

/***
 * For firebase setup see:
 * https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial#react-application-setup-create-react-app
 */
ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
