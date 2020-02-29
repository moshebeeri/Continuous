import React, { useState, useContext } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Typography } from '@material-ui/core';
import projectsActions from '../../redux/actions/projectsActions'

const Project = () => {
  const count = useSelector(state => state.projectsReducer.projectsCount)
  const dispatch = useDispatch()

  return( <div>
    <Typography>{count}</Typography>
      This project is with <button onClick={(event) => {
        dispatch(projectsActions.addProject())
        console.log('clicked!!')
      }}>Increase</button> 
    </div>
  )
}

export default Project