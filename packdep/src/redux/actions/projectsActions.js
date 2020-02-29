export const ADD_PROJECT = 'ADD_PROJECT'
export const DELETE_PROJECT = 'DELETE_PROJECT'

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
