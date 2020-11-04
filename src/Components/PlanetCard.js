import React from 'react';
import PropTypes from 'prop-types';
import Planet from './Planet';
import './planet-card.scss';

const PlanetCard = (props) => {
  const { name, population, terrain } = props.planetDetails;
  return (
    <div className='planet-card'>
      <div className='planet-details'>
        <div className='planet-name'> Name: {name} </div>
        <div className='planet-data'> Terrain: {terrain} </div>
        <div className='planet-data'> Population: {population} </div>
      </div>
      <div className='planet-population'>
        <Planet population={population / 500} />
      </div>
    </div>
  );
};

PlanetCard.propTypes = {
  planetDetails: PropTypes.shape({
    name: PropTypes.string.isRequired,
    population: PropTypes.string.isRequired,
    terrain: PropTypes.string.isRequired,
  }).isRequired,
};

export default PlanetCard;
