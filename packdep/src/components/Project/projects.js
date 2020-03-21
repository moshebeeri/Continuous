import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Typography, Paper } from "@material-ui/core"
import firebase from 'firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import projectsActions from "../../redux/actions/projectsActions"
import {
  Select,
  Input,
  MenuItem,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel
} from "@material-ui/core"
import { getOctokit, getAuthenticatedOctokit } from "../../github"
import { useCollectionData } from "react-firebase-hooks/firestore";
import { makeStyles } from "@material-ui/core/styles"
import { red } from "@material-ui/core/colors"

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    width: '100%'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  projectPaper: {
    display: 'flex',
    width: '100%',
    backgroundColor: '#AAA',
    flexDirection: 'column',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  }

}))

const Projects = () => {
  const projects = useSelector(state => state.projectsReducer.projects)
  const dispatch = useDispatch()
  const accessToken = useSelector(state => state.githubUser.accessToken)
  const [orgs, setOrgs] = useState([])
  const [repos, setRepos] = useState([])
  const [reposBranches, setReposBranches] = useState({})
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [repo, setRepo] = React.useState("")
  const [branch, setBranch] = React.useState("")
  const [user] = useAuthState(firebase.auth())
  const db = firebase.firestore()
  const [user_projects, projects_loading, projects_error] = useCollectionData(
    firebase
      .firestore()
      .collection("projects")
      .where("uid", "==", user? user.uid: 'none'),
    {}
  );

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const getUserProjects = async () => {
    return new Promise((resolve, reject) => {
      db.collection("projects" )
        .where("uid", "==", user.uid)
        .orderBy('last_run')
        .get()
        .then(querySnapshot => {
          return resolve(querySnapshot)
        })
        .catch(function(error) {
          reject(error)
        })
    })
  }

  const handleOk = () => {
    setOpen(false)
    const projectToAdd = { repo, branch }
    db.collection('projects').add({ uid: user.uid, repo, branch, status: '' })
      .then(function (docRef) {
        console.log(`Project ${JSON.stringify(projectToAdd)} added ID: ${docRef.id}`)
        dispatch(projectsActions.addProject(projectToAdd))
      })
      .catch(function (error) {
        console.error('Error adding document: ', error)
      })

  }

  function getUserGithubStatus() {
    if (accessToken) {
      const octokit = getAuthenticatedOctokit(accessToken)
      octokit.repos.list({ per_page: 10, page: 1 }).then(response => {
        // console.log(JSON.stringify(response))
        setRepos(response.data.map(repo => repo.name))
        response.data.map(repo => {
          octokit.repos
            .listBranches({
              owner: repo.owner.login,
              repo: repo.name
            })
            .then(response => {
              reposBranches[repo.name] = response.data
              let newReposBranches = { ...reposBranches }
              newReposBranches[repo.name] = response.data
              setReposBranches(newReposBranches)
            })
            .catch(e => {
              console.log(e.message)
            })
          return true
        })
      })
      octokit.orgs
        .listForAuthenticatedUser({ per_page: 10, page: 1 })
        .then(response => {
          setOrgs(response.data.map(org => org.login))
        })
    }
  }

  useEffect(() => {
    if (!projects_loading && !projects_error)
      updateStoreUserProjects(user_projects);
  }, [user_projects, projects_loading, projects_error]);

  const updateStoreUserProjects = (user_projects) => {
    console.log(`updateStoreUserProjects ${JSON.stringify(user_projects)}`);
    //dispatch(projectsActions.addProjects(user_projects));
  }

  useEffect(() => {
    if (accessToken) getUserGithubStatus()
  }, [accessToken])

  const renderRepoSelect = (repos) => {
    return repos.map((repo, i) => {
      return <MenuItem key={i} id={i} value={repo}>{repo}</MenuItem>
    })
  }

  const renderBranchSelect = () => {
    if (repo !== "" && reposBranches[repo]) {
      return reposBranches[repo].map((branch, i) => {
        return <MenuItem key={i} id={i} value={branch.name}>{branch.name}</MenuItem>
      })
    }
  }

  const handleRepoSelected = event => {
    console.log(event.target.value)
    setRepo(event.target.value || '')
  }

  const handleBranchSelected = event => {
    console.log(event.target.value)
    setBranch(event.target.value || '')
  }

  const getDefaultBranchForSelection = () => {
    if (repo !== "" && branch === "" && reposBranches[repo] &&
      reposBranches[repo].length === 1)
      setBranch(reposBranches[repo][0].name)
    return branch
  }

  const showDebugReposAndBranches = () => {
    // return (
    //   {accessToken ? (
    //     <Typography>
    //       You have {repos.length} repos and you are member of {orgs.length} orgs
    //       orgs {JSON.stringify(orgs)}
    //       branches{" "}
    //       {JSON.stringify(
    //         Object.keys(reposBranches)
    //           .map(key => reposBranches[key].length)
    //           .reduce((prev, curr) => prev + curr, 0)
    //       )}
    //     </Typography>
    //   ) : (
    //     <Typography>No repos for you</Typography>
    //   )}    
    // )
  }

  const renderAddedProjects = () => {
    const projects_TO_TEST = [
      { repo: "repo1", branch: 'branch1' },
      { repo: "repo2", branch: 'branch2' },
      { repo: "repo3", branch: 'branch3' },
      { repo: "repo4", branch: 'branch4' },
      { repo: "repo5", branch: 'branch4' },
      { repo: "repo6", branch: 'branch4' },
      { repo: "repo7", branch: 'branch4' },
      { repo: "repo8", branch: 'branch4' },
      { repo: "repo19", branch: 'branch4' },
      { repo: "repo39", branch: 'branch4' },
      { repo: "repo49", branch: 'branch4' },
      { repo: "repo59", branch: 'branch4' },
    ]
    return projects.map(project => {
      const branch = project.branch
      const repo = project.repo
      return (
        <div style={{ width: '400px', display: 'flex', flexWrap: 'wrap', margin: '10px' }}>
          <Paper variant="outlined" elevation={3} style={{ width: '400px', height: '100px', alienItems: 'flex-start', display: 'flex', flexDirection: 'column' }}>
            <Typography align='left' key={repo + branch + "_repo"} component={'span'}>Repo: {repo}</Typography>
            <Typography align='left' key={repo + branch + "_branch"} component={'span'}>Branch: {branch}</Typography>
          </Paper>
        </div>
      )
    })
  }

  return (
    <div style={{justifyContent: 'center', alignItems: 'center' }}>
      <Button style={{ color: 'white', backgroundColor: "#AAA" }} onClick={handleClickOpen}>Add Repo</Button>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Select Repo & Branch</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="repo-dialog-native">Repo</InputLabel>
              <Select
                labelId="repo-dialog-select-label"
                id="repo-dialog-select"
                value={repo}
                onChange={handleRepoSelected}
                input={<Input />}
              >
                {renderRepoSelect(repos)}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="branch-dialog-native">Branch</InputLabel>
              <Select
                labelId="branch-dialog-select-label"
                id="branch-dialog-select"
                value={getDefaultBranchForSelection()}
                onChange={handleBranchSelected}
                input={<Input />}
              >
                {renderBranchSelect()}
              </Select>
            </FormControl>
          </form>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
              </Button>
            <Button onClick={handleOk} color="primary">
              Ok
              </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <div style={{ paddingTop: '20px', alienItems: 'center', display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}>
        {renderAddedProjects()}
      </div>
    </div>
  )
}

export default Projects

