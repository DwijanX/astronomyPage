import React from 'react';
import PlanetSection from '../../components/planetarySection';
import Navbar from '../../components/Navbar';
import { useParams } from 'react-router-dom';
const PlanetView = () => {
  const { planetName } = useParams();

  return (
    <div >
        <Navbar></Navbar>
      <PlanetSection planet={planetName}></PlanetSection>
    </div>
  );
};

export default PlanetView;