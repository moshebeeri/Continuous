

const authProvider = new firebase.auth.GoogleAuthProvider()

function* loginSaga() {
  try {
    const data = yield call(reduxSagaFirebase.auth.signInWithPopup, authProvider)
    yield put(loginSuccess(data))
  }
  catch(error) {
    yield put(loginFailure(error))
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(types.LOGIN.REQUEST, loginSaga)
  ])
}
