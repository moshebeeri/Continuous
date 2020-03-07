import React from 'react'
// import logo from './logo.svg'
import './App.css'
import 'typeface-roboto'
import TopBar from './components/TopBar/topbar'
import Project from './components/Project/project'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from 'firebase'
import userActions from './redux/actions/userActions'
import { useDispatch } from "react-redux"

const App = () => {
  const [user] = useAuthState(firebase.auth())
  const db = firebase.firestore()
  const dispatch = useDispatch()

  if(user){
    db.collection('github_users').where('uid', '==', user.uid).get().then( snapshot => {
      try{
        const githubUser = snapshot.docs[0].data()
        dispatch(userActions.setGithubAccessToken(githubUser.token))
      }catch(e){
        console.log(e.message)
      }
    })
}

  return (
    <div className="App">
      <TopBar/>
      <header className="App-header">
        <Project />
      </header>
    </div>
  )
}

export default App
