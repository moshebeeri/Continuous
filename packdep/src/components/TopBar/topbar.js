import React, { useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, IconButton}  from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import GitHubIcon from '@material-ui/icons/GitHub'
import firebase from 'firebase'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop:'15px',
    width: '100%',
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {backgroundColor:'midnightblue'},
  login:{verticalAlign: 'middle', marginTop: 'none'},
  loginText: {fontSize: '60%', marginRight: '10px'}
}))

const TopBar = () => {
  const classes = useStyles()
  //see https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/

    const githubLogin = (event) => {
      console.log('login clicked')
      const provider = new firebase.auth.GithubAuthProvider()
      firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      var token = result.credential.accessToken
      // The signed-in user info.
      var user = result.user
      // ...
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
      <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            PACKDEP - continous dependency
          </Typography>
          <Typography className={classes.login}>
            <IconButton onClick={githubLogin} 
                        edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <GitHubIcon/>
            </IconButton>
            <Typography className={classes.loginText}>Login With GitHub</Typography>
          </Typography>
          
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default TopBar