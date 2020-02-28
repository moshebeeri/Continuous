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
  return { type: LOGIN, user }
}
export function logout() {
  return { type: LOGOUT, user: null}
}
