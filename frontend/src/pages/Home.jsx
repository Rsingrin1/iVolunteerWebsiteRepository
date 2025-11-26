import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../assets/App.css'
import { Link } from "react-router-dom";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="logo-row">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        <Link to="/About">Go to About Page</Link>
      </p>
      <p className="read-the-docs">
        <Link to="/exampleMongoHookup">Go to Example Mongo Hookup Page</Link>
      </p>
      <p className="read-the-docs">
        <Link to="/testPage">Test page</Link>
      </p>
      <p className="read-the-docs">
        <Link to="/Profile">Go to Profile Page</Link>
      </p>
      <p className="read-the-docs">
        <Link to="/userInput">add a user!</Link>
      </p>
      <p className="read-the-docs">
      <Link to="/MyEventsOrganizer">MyEventsOrganizer</Link>
      </p>
      <p className="read-the-docs">
      <Link to="/getUserByID">Get User By ID</Link>
      </p>
    </>
  )
}

export default App
