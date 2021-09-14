import React from 'react';
import PropTypes from 'prop-types';

function Restart({ reset }) {
  return (
    <button type="button" onClick={reset}>Restart</button>
  );
}

export default Restart;

Restart.propTypes = {
  reset: PropTypes.func.isRequired,
};
