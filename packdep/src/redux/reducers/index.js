import { combineReducers } from 'redux'
import loadingReducer from './loadingReducer'
import currentUser from './userReducer'
import projectsReducer from './projectsReducer'


const rootReducer = combineReducers({
  loadingReducer, 
  currentUser, 
  projectsReducer
})

export default rootReducer
