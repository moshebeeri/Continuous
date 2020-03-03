import firebase from 'firebas'
import { put, all, call, takeEvery } from 'redux-saga/effects'
import {rsf} from '../../firebase'
import { LOGIN } from '../actions/userActions'
const authProvider = new firebase.auth.GoogleAuthProvider()

function* loginSaga() {
  try {
    const data = yield call(rsf.auth.signInWithPopup, authProvider)
    yield put(loginSuccess(data))
  }
  catch(error) {
    yield put(loginFailure(error))
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(LOGIN, loginSaga)
  ])
}
