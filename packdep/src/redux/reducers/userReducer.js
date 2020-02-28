import {LOGIN, LOGOUT} from '../actions/userActions'

export function loginReducer (user, action) {
  switch(action.type){
    case LOGIN:
        return user
    case LOGOUT:
    default:
      return null
  }
}