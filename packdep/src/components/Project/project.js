import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Typography } from '@material-ui/core'
import projectsActions from '../../redux/actions/projectsActions'
import {getOctokit, getAuthenticatedOctokit} from '../../github'  
import { useCollection } from 'react-firebase-hooks/firestore'

const Project = () => {
  const count = useSelector(state => state.projectsReducer.projectsCount)
  const dispatch = useDispatch()
  const accessToken = useSelector(state => state.githubUser.accessToken)
  const githubUser = useSelector(state => state.githubUser.accessToken)
  const [orgs, setOrgs] = useState([])

  function saveDataToFirebase(){}

  // useEffect(() => {
  //     if(accessToken){
  //       const octokit = getAuthenticatedOctokit(accessToken)
  //       octokit.repos.list({per_page: 10, page: 1})
  //       .then((response) => {
  //         console.log(JSON.stringify(response))
  //         setOrgs(response.data.map(repo => repo.name))
  //       })
  //     }
  //   })
  //   return <div>{JSON.stringify(orgs)}</div>

  return( <div>
    <Typography>{count}</Typography>
      This project is with <button onClick={(event) => {
        dispatch(projectsActions.addProject())
        console.log('clicked!!')
      }}>Increase</button> 
      {
        accessToken? 
        <Typography>You have {orgs.length} orgs</Typography> :
        <Typography>No orgs for me</Typography>
      }
    </div>
  )
}

export default Project