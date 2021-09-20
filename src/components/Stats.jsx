import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useStats from '../hooks/useStats';

import IconFlag from '../assets/Flag';
import IconMap from '../assets/Map';
import IconMine from '../assets/Mine';

function Stats({ grid, mines }) {
  const { flags, toDiscover, minesLeft } = useStats({ grid, mines });
  return (
    <Container>
      <Information>
        <IconFlag />
        {' '}
        {flags}
      </Information>
      <Information>
        <IconMine />
        {' '}
        {minesLeft}
      </Information>
      <Information>
        <IconMap />
        {' '}
        {toDiscover}
        %
      </Information>
    </Container>
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

const Container = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Information = styled.div`
  display: flex;
  align-items: center;

  & > svg {
    margin-right: 0.5rem;
  }
`;
