import { combineReducers } from 'redux'
import loadingReducer from './loadingReducer'
import githubUser from './userReducer'
import projectsReducer from './projectsReducer'


const rootReducer = combineReducers({
  loadingReducer, 
  githubUser, 
  projectsReducer
})

export default rootReducer
