import React from 'react';
import PropTypes from 'prop-types';

function Message({ gameState, reset }) {
  if (gameState === 'victory') {
    return (
      <>
        <h2>Victory</h2>
        <div>Congratulations, you have successfully located all the mines!</div>
        <button type="button" onClick={reset}>Click here to play again.</button>
      </>
    );
  }

  if (gameState === 'defeat') {
    return (
      <>
        <h2>Defeat</h2>
        <div>Oh no, you stepped on a mine and were blown to bits.</div>
        <button type="button" onClick={reset}>Click here to play again.</button>
      </>
    );
  }

  return (<></>);
}

export default Message;

Message.propTypes = {
  gameState: PropTypes.oneOf(['victory', 'defeat', 'playing']),
  reset: PropTypes.func.isRequired,
};

Message.defaultProps = {
  gameState: 'playing',
};
