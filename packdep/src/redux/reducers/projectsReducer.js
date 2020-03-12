import {ADD_PROJECT, DELETE_PROJECT} from '../actions/projectsActions'
import _ from 'lodash'

/**
 * 
 * @param {current or initial state} state 
 * @param {as defeined in action} action 
 * @param - projects and state project should be of the structure {
 *  repoName: {
 *    branch: {
 *      project configuration.
 *    }
 *  }
 * } 
 */
const projectsReducer = (state = {projectsCount: 0, projects: {} }, action) => {
  switch(action.type) {
    case ADD_PROJECT:
      return {...state, projectsCount: state.projectsCount+1, projects: _.assign(state.projects, action.payload)}
    case DELETE_PROJECT:
      return {...state, projectsCount: state.projectsCount-1}
    default:
      return state
  }
}

export default projectsReducer