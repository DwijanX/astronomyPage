import React from 'react';
import Planet from './Planet';
import PlanetDescription from './PlanetDescription';
import planets from '../Info/planetsInfo';
const PlanetSection = ({planet}) => {
  const currentPlanet = planets[planet]
  return (
    <div className="planet-section">
      <div className="planetarium">
        <Planet texturePath={currentPlanet.texture} />
      </div>
      <PlanetDescription planetInfo={currentPlanet} />
    </div>
  );
};

export default PlanetSection;