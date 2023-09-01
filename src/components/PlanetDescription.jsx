import React from 'react';

const PlanetDescription = ({ planetInfo }) => {
  return (
    <div className="planet-description">
      <h2>{planetInfo.name}</h2>
      <p>{planetInfo.description}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default PlanetDescription;