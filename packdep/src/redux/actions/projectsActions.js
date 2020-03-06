export const ADD_PROJECT = 'ADD_PROJECT'
export const DELETE_PROJECT = 'DELETE_PROJECT'
export const ADD_PROJECT_ASYNC = 'ADD_PROJECT_ASYNC'
export const DELETE_PROJECT_ASYNC = 'DELETE_PROJECT_ASYNC'

const addProject = () => {
  return { type: ADD_PROJECT }
}
const deleteProject = () => {
  return { type: DELETE_PROJECT}
}

export default {
  addProject,
  deleteProject
}
