import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, IconButton, Button}  from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import GitHubIcon from '@material-ui/icons/GitHub'
import firebase from 'firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDispatch, useSelector } from "react-redux"

import userActions from '../../redux/actions/userActions'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop:'15px',
    width: '100%',
    flexGrow: 1,
    alignItems: 'center'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    alignItems: 'center',
    textAlign: 'center'
  },
  toolbar: {backgroundColor:'midnightblue'},
  login:{verticalAlign: 'middle', marginTop: 'none'},
  loginText: {fontSize: '80%', marginRight: '10px'},
  loginLink: {visited: '#FFF'}
}))


function saveGithubToken(db, user, accessToken) {
  db.collection("github_users").where('uid', '==', user.uid).get().then((querySnapshot) => {
    querySnapshot.forEach(function(doc) {
      doc.ref.delete();
    });
    db.collection("github_users").add({token: accessToken, uid: user.uid })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id)
      })
      .catch(function (error) {
        console.error("Error adding document: ", error)
      })
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
}


const TopBar = () => {
  const [user] = useAuthState(firebase.auth())
  
  const dispatch = useDispatch()
  // Allows you to extract data from the Redux store state, using a selector function.
  const projectsCount = useSelector(state => state.projectsReducer.projectsCount)
  const classes = useStyles()
  const db = firebase.firestore()
  // get accessToken by firebase user
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
  //see https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/
    const githubLogout = (params) => {
      firebase.auth().signOut()
      db.collection('github_users').where('uid', '==', user.uid).get().then( snapshot => {
        snapshot.forEach(function(doc) {
          // Not sure we really need to delete the user
          doc.ref.delete();
        })
      })
    }

    const githubLogin = (event) => {
      const provider = new firebase.auth.GithubAuthProvider()
      provider.addScope('user');
      firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      var accessToken = result.credential.accessToken
      console.log(accessToken)  
      dispatch(userActions.setUser(result.user))
      dispatch(userActions.setGithubAccessToken(accessToken))
      saveGithubToken(db, result.user, accessToken)

      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        // The email of the user's account used.
        var email = error.email
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential
        // ...
      })
    }
  
  return (
      <div>
      <AppBar>
        <Toolbar className={classes.toolbar}>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          {
            user? 
             <Typography component={'span'}  variant="h5" style={{textTransform: "capitalize"}}>
              Hello {user.displayName} 
            </Typography> : null
          }
          <Typography component={'span'}  variant="h6" className={classes.title}>
            PACKDEP - continuous dependency {parseInt(projectsCount)} projects
          </Typography>
          {user?
          <Typography component={'span'} className={classes.login}>
            <IconButton onClick={githubLogout} 
                        edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <GitHubIcon/>
            </IconButton>
           <Typography component={'span'} className={classes.loginText}>Logout GitHub</Typography>
          </Typography>
          : 
          <Typography component={'span'} className={classes.login}>
            <IconButton onClick={githubLogin} 
                        edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <GitHubIcon/>
            </IconButton>
            <Typography component={'span'} className={classes.loginText}><a onClick={githubLogin} style={{ color: '#FFF' }} href='#'>Login With GitHub</a></Typography>
          </Typography>
        } 
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default TopBar

