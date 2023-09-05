import React from 'react';
import PlanetDescription from './PlanetDescription';
import planets from '../Info/planetsInfo';
import CelestiaBody from './CelestialBody';
const PlanetSection = ({planet}) => {
  const currentPlanet = planets[planet]
  return (
    <div className="planet-section">
      <div className="planetarium">
        <CelestiaBody texturePath={currentPlanet.texture} ringsTexture={currentPlanet.ringsTexture??currentPlanet.ringsTexture} type={currentPlanet.type} />
      </div>
      <PlanetDescription planetInfo={currentPlanet} />
    </div>
  );
};

export default PlanetSection;