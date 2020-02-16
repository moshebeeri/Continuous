import {firebase as F} from 'firebase'
import config from './firebaseConfig'

// var config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
//   apiKey: "unreadablestuff",
//   authDomain: "your-domain-name.firebaseapp.com",
//   databaseURL: "https://your-domain-name.firebaseio.com",
//   storageBucket: "your-domain-name.appspot.com",
//   messagingSenderId: "123123123123"
// };
var firebase = F.initializeApp(config);
export default firebase;
