import React from 'react';
import PropTypes from 'prop-types';
import useStats from '../hooks/useStats';

function Stats({ grid, mines }) {
  const { flags, toDiscover, minesLeft } = useStats({ grid, mines });
  return (
    <div>
      <div>
        Flags:
        {' '}
        {flags}
      </div>
      <div>
        Unsweeped Mines:
        {' '}
        {minesLeft}
      </div>
      <div>
        To be discovered:
        {' '}
        {toDiscover}
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
