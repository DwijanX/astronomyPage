import { useState } from 'react'
import './App.css'
import PlanetSection from './views/planetarySection/planetarySection'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header className="App-header">
        <h1>3D Sphere Example</h1>
        <PlanetSection></PlanetSection>
      </header>
    </>
  )
}

export default App
