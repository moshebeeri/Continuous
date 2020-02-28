import { combineReducers } from 'redux'
import loadingReducer from './loadingReducer'
import {loginReducer} from './userReducer'



const rootReducer = combineReducers({
  loadingReducer, loginReducer
})

export default rootReducer
