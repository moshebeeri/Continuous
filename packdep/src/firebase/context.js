import React from 'react';
import Firebase from './firebase';

const FirebaseContext = React.createContext({
  firebase: Firebase,
  user: null
});
export default FirebaseContext;
