import {ADD_PROJECT, DELETE_PROJECT} from '../actions/projectsActions'

const projectsReducer = (state = {projectsCount: 0, projects: [] }, action) => {
  switch(action.type) {
    case ADD_PROJECT:
      return {...state, projectsCount: state.projectsCount+1}
    case DELETE_PROJECT:
      return {...state, projectsCount: state.projectsCount-1}
    default:
      return state
  }
}

export default projectsReducer