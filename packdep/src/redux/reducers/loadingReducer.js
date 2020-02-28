import {STARTED_LOADING, FINISHED_LOADING} from '../actions/loadingActions'

const loadingReducer = (state = {loading: false, loaded: false}, action) => {
  switch(action.type) {
    case STARTED_LOADING:
      return {...state, loading: true, loaded: false}
    case FINISHED_LOADING:
      return {...state, loading: false, loaded: true}
    default:
      return state
  }
}

export default loadingReducer