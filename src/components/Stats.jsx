import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useStats from '../hooks/useStats';

import IconFlag from '../assets/Flag';
import IconMap from '../assets/Map';

function Stats({ grid, mines }) {
  const { minesToDiscover, percSafeCellsToDiscover } = useStats({ grid, mines });
  return (
    <Container>
      <Information>
        <IconFlag />
        {' '}
        {minesToDiscover}
      </Information>
      <Information>
        <IconMap />
        {' '}
        {percSafeCellsToDiscover}
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
