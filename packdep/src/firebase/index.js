import '@firebase/firestore'

import ReduxSagaFirebase from 'redux-saga-firebase'
import React from 'react'
import firebase from 'firebase'
import config from './firebaseConfig'

// var config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
//   apiKey: "unreadablestuff",
//   authDomain: "your-domain-name.firebaseapp.com",
//   databaseURL: "https://your-domain-name.firebaseio.com",
//   storageBucket: "your-domain-name.appspot.com",
//   messagingSenderId: "123123123123"
// }

const app = firebase.initializeApp(config)
const FirebaseContext = React.createContext({
  app: app,
  user: null
})

class Firebase {
  constructor() {
    this.app = app
    this.auth = app.auth()
  }
}

const rsf = new ReduxSagaFirebase(app)
export default FirebaseContext 
export {Firebase, rsf}
