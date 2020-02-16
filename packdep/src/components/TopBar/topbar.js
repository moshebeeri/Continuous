import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton}  from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import GitHubIcon from '@material-ui/icons/GitHub';

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
}));

const TopBar = () => {
  const classes = useStyles();
  //const githubLogin = () => {}
  
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
            <IconButton onClick={(event) => {console.log('login clicked')}} 
                        edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <GitHubIcon/>
            </IconButton>
            <Typography className={classes.loginText}>Login With GitHub</Typography>
          </Typography>
          
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default TopBar;