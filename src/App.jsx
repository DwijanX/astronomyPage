import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PlanetarySection from './views/planetarySection/planetarySection'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header className="App-header">
        <h1>3D Sphere Example</h1>
        <PlanetarySection></PlanetarySection>
      </header>
    </>
  )
}

export default App
