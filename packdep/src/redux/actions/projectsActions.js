export const ADD_PROJECT = 'ADD_PROJECT'
export const DELETE_PROJECT = 'DELETE_PROJECT'
export const ADD_PROJECT_ASYNC = 'ADD_PROJECT_ASYNC'
export const DELETE_PROJECT_ASYNC = 'DELETE_PROJECT_ASYNC'

const addProject = (projectData) => {
  return { type: ADD_PROJECT, payload: projectData }
}
const deleteProject = (projectId) => {
  return { type: DELETE_PROJECT, payload: projectId}
}

export default {
  addProject,
  deleteProject
}
