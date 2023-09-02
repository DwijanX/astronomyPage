// App.js (or Main.js)
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Navbar from './components/Navbar';
import PlanetView from './views/planetarySection/planetsView';
import "./styles.css"
// Import other view components if you have more views

function App() {
  const router = createBrowserRouter([
    {
      path: "/planet/:planetName",
      element: <PlanetView></PlanetView>,
    },
  ]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
