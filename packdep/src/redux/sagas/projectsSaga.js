import {ADD_PROJECT, ADD_PROJECT_ASYNC, DELETE_PROJECT} from '../actions/projectsActions'
import {put, call, takeEvery} from 'redux-saga/effects'

const delay = (ms) => new Promise(res => setTimeout(res, ms))

//call redux
function* addProjectAsync(){
  yield delay(1000) // or yield call(fetch...)
  yield put({ type: ADD_PROJECT })
}

//middleware hook
export function* watchAddProjectAsync(){
  yield takeEvery(ADD_PROJECT_ASYNC, addProjectAsync)
}
