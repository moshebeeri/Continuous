import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Typography, Paper } from "@material-ui/core"
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
import { useCollection } from "react-firebase-hooks/firestore"
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
    width: '80%',
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

const Project = () => {
  const projects = useSelector(state => state.projectsReducer.projects)
  const dispatch = useDispatch()
  const accessToken = useSelector(state => state.githubUser.accessToken)
  const githubUser = useSelector(state => state.githubUser.accessToken)
  const [orgs, setOrgs] = useState([])
  const [repos, setRepos] = useState([])
  const [reposBranches, setReposBranches] = useState({})
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [repo, setRepo] = React.useState("")
  const [branch, setBranch] = React.useState("")

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleOk = () => {
    //TODO: update redux database and functions
    setOpen(false)
    const projectToAdd = {}
    projectToAdd[repo] = {branch}
    console.log(`handle add ${JSON.stringify(projectToAdd)}`)
    dispatch(projectsActions.addProject(projectToAdd))
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
    if (accessToken) getUserGithubStatus()
  }, [accessToken])
  const renderRepoSelect = (repos) => {
    return repos.map((repo, i) => {
      return <MenuItem key={i} id={i} value={repo}>{repo}</MenuItem>
    })
  }
  
  const renderBranchSelect = () => {
    if(repo !== "" && reposBranches[repo]){
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
    if(repo !== "" && branch === "" && reposBranches[repo] && 
      reposBranches[repo].length === 1)
      return reposBranches[repo][0].name
    return branch
  }

  const renderAddedProjects = () => {
    const projects = {
      repo1: {branch:'branch1'},
      repo2: {branch:'branch2'},
      repo3: {branch:'branch3'},
      repo4: {branch:'branch4'},
      repo5: {branch:'branch4'},
      repo6: {branch:'branch4'},
      repo7: {branch:'branch4'},
      repo8: {branch:'branch4'},
      repo19: {branch:'branch4'},
      repo39: {branch:'branch4'},
      repo49: {branch:'branch4'},
      repo59: {branch:'branch4'},
    }
    return Object.keys(projects).map(repo => {
      const branch = projects[repo].branch
      return (
      <div style={{width:'250px', display: 'flex', flexWrap:'wrap', margin:'10px'}}>
        <Paper variant="outlined" elevation={3} style={{alienItems:'flex-start', display: 'flex',flexDirection:'column'}}> 
          <Typography align='left' key={repo+branch+"_repo"} component={'span'}>Repo: {repo}</Typography>
          <Typography align='left' key={repo+branch+"_branch"} component={'span'}>Branch: {branch}</Typography>
        </Paper>
      </div>
    )})
  }

  return (
    <div>
      <div style={{ width:'900px', height:'600px', display: 'flex', flexWrap:'wrap', flexDirection:'row'}}>
        {renderAddedProjects()}
      </div>
    <Button onClick={handleClickOpen}>Open select dialog</Button>
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
      {accessToken ? (
        <Typography>
          You have {repos.length} repos and you are member of {orgs.length} orgs
          orgs {JSON.stringify(orgs)}
          branches{" "}
          {JSON.stringify(
            Object.keys(reposBranches)
              .map(key => reposBranches[key].length)
              .reduce((prev, curr) => prev + curr, 0)
          )}
        </Typography>
      ) : (
        <Typography>No repos for you</Typography>
      )}
    </div>
  )
}

export default Project
