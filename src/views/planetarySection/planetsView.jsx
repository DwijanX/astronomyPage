import React from 'react';
import PlanetSection from '../../components/planetarySection';
import Navbar from '../../components/Navbar';
import { useParams } from 'react-router-dom';
const PlanetView = () => {
  const { name } = useParams();

  return (
    <div >
        <Navbar></Navbar>
      <PlanetSection planet={name}></PlanetSection>
    </div>
  );
};

export default PlanetView;