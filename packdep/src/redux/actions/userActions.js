export const SET_USER = 'SET_USER'
export const LOGIN = 'LOGIN'
export const LOG_OUT = 'LOG_OUT'
export const GITHUB_ACCESS_TOKEN = 'GITHUB_ACCESS_TOKEN'

const setUser = (user) => {
  return { type: SET_USER,
            payload: user }
}

const setGithubAccessToken = (accessToken) => {
  return { type: GITHUB_ACCESS_TOKEN,
            payload: accessToken }
}

const  login = () => {
  return {  type: LOGIN,
            login: true }
}

const  logout = () => {
  return { type: LOG_OUT, login: false }
}

export default {
  setUser,
  login,
  logout,
  setGithubAccessToken
}