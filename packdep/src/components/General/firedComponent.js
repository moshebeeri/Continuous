import React from 'react'
import FirebaseContext,  { app, rsf } from '../../firebase'
// import firebase from 'firebase'
// const github = rsf.auth.GithubAuthProvider()

const FiredComponent = () => (
  <FirebaseContext.Consumer>
    {firebase => {
      return <div>I've access to Firebase and render Something {rsf.auth.githubUser}.</div>
    }}
  </FirebaseContext.Consumer>
)
export default FiredComponent
