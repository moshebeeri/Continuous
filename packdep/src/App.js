import React from 'react'
import logo from './logo.svg'
import './App.css'
import 'typeface-roboto'
import TopBar from './components/TopBar/topbar'
import Project from './components/Project/project'

const App = () => {
  return (
    <div className="App">
      <TopBar/>
      <header className="App-header">
        <Project />
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  )
}

export default App
