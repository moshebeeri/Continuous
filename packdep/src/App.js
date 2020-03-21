import React from 'react'
// import logo from './logo.svg'
import './App.css'
import 'typeface-roboto'
import TopBar from './components/TopBar/topbar'
import Projects from './components/Project/projects'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from 'firebase'
import userActions from './redux/actions/userActions'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import ProjectStatus from './components/Status/projectStatus'

const App = () => {
  const [user] = useAuthState(firebase.auth())
  const db = firebase.firestore()
  const dispatch = useDispatch()

  if (user) {
    db.collection('github_users').where('uid', '==', user.uid).get().then(snapshot => {
      try {
        const githubUser = snapshot.docs[0].data()
        dispatch(userActions.setGithubAccessToken(githubUser.token))
      } catch (e) {
        console.log(e.message)
      }
    })
  }
  //style={{ backgroundColor: 'blue', width: "100%" }}
  return (
    <div className="App">
      <BrowserRouter>
          <TopBar style={{width:'100%', flex:1}}/>
          <Route path='/' exact component={Projects} />
          <Route path='/status' exact component={ProjectStatus} />
      </BrowserRouter>
    </div>
  )
}

export default App
