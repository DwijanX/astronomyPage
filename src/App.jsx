// App.js (or Main.js)
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import PlanetView from './views/planetarySection/planetsView';
import "./styles.css"
// Import other view components if you have more views

function App() {
  const router = createBrowserRouter([
    {
      path: "/celestialBody/:name",
      element: <PlanetView></PlanetView>,
    },
    {
      path: '/',
      element: <Navigate to="/celestialBody/earth" replace />,
    },
    
  ]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
