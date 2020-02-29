export const SET_USER = 'SET_USER'
export const LOG_OUT = 'LOG_OUT'

const setUser = (user) => {
  return { type: SET_USER,
            payload: user }
}
const  logout = () => {
  return { type: LOG_OUT}
}

export default {
  setUser,
  logout
}