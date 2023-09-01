import React from 'react';
import Planet from '../../components/Planet';
import PlanetDescription from '../../components/PlanetDescription';
import "./planetarySectionStyles.css"
const PlanetSection = () => {
  const earthInfo = {
    name: 'Earth',
    description: 'Earth is the third planet from the Sun and the only astronomical object known to harbor life. It is the densest planet in the Solar System and is sometimes referred to as the World or the Blue Planet due to its abundant water.'
  };

  return (
    <div className="planet-section">
      <div className="planetarium">
        <Planet texturePath="../../assets/textures/earthlights1k.jpg" />
      </div>
      <PlanetDescription planetInfo={earthInfo} />
    </div>
  );
};

export default PlanetSection;