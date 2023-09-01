import React, { useState } from 'react';
import Planet from '../../components/Planet';

const PlanetarySection = () => {
  const [planetInfo, setPlanetInfo] = useState(null);

  const handlePlanetClick = (info) => {
    setPlanetInfo(info);
  };

  return (
    <div className="planetary-section">
      <div className="planetarium">
        {/* Render each planet component */}
        <Planet texturePath='src/assets/textures/earthlights1k.jpg' />

        {/* ... more planets ... */}
      </div>
      
    </div>
  );
};

export default PlanetarySection;
/*<div className="description-section">
        <Description info={planetInfo} />
      </div>*/