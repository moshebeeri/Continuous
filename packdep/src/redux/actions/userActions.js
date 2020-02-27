export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

/*
 * other constants
 */
export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

/*
 * action creators
 */
export function login(user) {
  return { user }
}
export function logout(user) {
  return {}
}
