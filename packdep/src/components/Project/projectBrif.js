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
import { makeStyles } from "@material-ui/core/styles"

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

const ProjectBrif = (props) => {
  const project = props.project
  const repo = project.repo
  const branch = project.branch
  const projectId = project.projectId

  return (
    <div key={projectId} style={{ width: '400px', display: 'flex', flexWrap: 'wrap', margin: '10px' }}>
      <Paper variant="outlined" elevation={3} style={{ width: '400px', height: '100px', alienItems: 'flex-start', display: 'flex', flexDirection: 'column' }}>
        <Typography align='left' key={repo} component={'span'}>Repo: {repo}</Typography>
        <Typography align='left' key={branch} component={'span'}>Branch: {branch}</Typography>
      </Paper>
    </div>
  )
}

export default ProjectBrif


