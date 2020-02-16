import FirebaseContext from './context';
import Firebase from './firebase';
import '@firebase/firestore'

import ReduxSagaFirebase from 'redux-saga-firebase'
const rsf = new ReduxSagaFirebase(Firebase)

export default Firebase;
export { FirebaseContext, rsf};
