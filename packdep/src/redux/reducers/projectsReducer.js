import {
  ADD_PROJECT,
  ADD_PROJECTS,
  DELETE_PROJECT
} from "../actions/projectsActions";
import _ from 'lodash'

/**
 * 
 * @param {current or initial state} state 
 * @param {as defeined in action} action 
 */
const projectsReducer = (state = {projectsCount: 0, projects: [] }, action) => {
  switch(action.type) {
    case ADD_PROJECT:
      return {...state, projectsCount: state.projectsCount+1, projects: [...state.projects, action.payload]}
    case ADD_PROJECTS:
      return {...state, projectsCount: state.projectsCount+1, projects: [...state.projects, ...action.payload]}
    case DELETE_PROJECT:
      return {...state, projectsCount: state.projectsCount-1}
    default:
      return state
  }
}

export default projectsReducer