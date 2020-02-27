import React, { useState, useContext } from 'react'
import { useDispatch, useSelector } from "react-redux";

const Project = () => {

  return <div>
    This project is with <button onClick={(event) => {console.log('clicked!!')}}>click</button> 
  </div>

}

export default Project