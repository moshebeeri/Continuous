import {SET_USER, 
  LOG_OUT,
  LOGIN,
  GITHUB_ACCESS_TOKEN} from '../actions/userActions'

const githubUser = (state = {}, action) => {
  switch(action.type){
      case SET_USER:
          return {
              ...state,
              user: action.payload,
          }
      case LOG_OUT:
          return {
              ...state,
              user: {},
              loggedIn: false
          }
      case LOGIN:
        return {
            ...state,
            loggedIn: true
        }
      case GITHUB_ACCESS_TOKEN:
        return {
            ...state,
            accessToken: action.payload
        }
  
        default:
          return state
  }
}

export default githubUser