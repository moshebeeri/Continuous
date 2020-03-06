import firebase from 'firebas'
import { put, all, call, takeEvery } from 'redux-saga/effects'
import {rsf} from '../../firebase'
import { LOGIN } from '../actions/userActions'
const authProvider = new firebase.auth.GithubAuthProvider()

//Worker
function* loginSagaAsync() {
  try {
    const result = yield call(rsf.auth.signInWithPopup, authProvider)
    yield put({type: LOGIN_SUCCESS, 
      payload: {
        accessToken: result.credential.accessToken, 
        user: result.user
      }})
  }
  catch(error) {
    yield put({type: LOGIN_FAILIURE , payload: error})
  }
}

//Watcher
export default function* loginSaga() {
  yield all([
    takeEvery(LOGIN, loginSagaAsync)
  ])
}
