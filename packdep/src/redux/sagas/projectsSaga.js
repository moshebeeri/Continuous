import {ADD_PROJECT, DELETE_PROJECT} from '../actions/projectsActions'
import {put, call, takeEvery} from 'redux-saga/effects'

function* addProjectAsync(){
  yield put({})
}

export function* addProjectSaga(){
  yield takeEvery(ADD_PROJECT, addProjectAsync)
}




