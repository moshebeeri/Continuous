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
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
