import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    width: '100%'
  },
}))

const Project = (props) => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <h1>Hi, I am a project component</h1>
    </div>
  )
}

export default Project

