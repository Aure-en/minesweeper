import React from 'react';
import PropTypes from 'prop-types';
import useStats from '../hooks/useStats';

function Stats({ grid, mines }) {
  const { minesToDiscover, percSafeCellsToDiscover } = useStats({ grid, mines });
  return (
    <div>
      <div>
        Mines to discover:
        {' '}
        {minesToDiscover}
      </div>
      <div>
        Safe cells to be discovered:
        {' '}
        {percSafeCellsToDiscover}
        %
      </div>
    </div>
  );
}

export default Stats;

Stats.propTypes = {
  grid: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.oneOf(['X', 'F', null]),
      ]),
    ),
  ).isRequired,
  mines: PropTypes.number.isRequired,
};
