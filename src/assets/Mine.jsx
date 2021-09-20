import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';

function Mine({ causeDefeat }) {
  const themeContext = useContext(ThemeContext);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-brightness-2"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={themeContext.mine_stroke}
      fill={
        causeDefeat ? themeContext.mine_fill_triggered : themeContext.mine_fill
      }
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx="12" cy="12" r="3" />
      <path
        d="M6 6h3.5l2.5 -2.5l2.5 2.5h3.5v3.5l2.5 2.5l-2.5 2.5v3.5h-3.5l-2.5 2.5l-2.5 -2.5h-3.5v-3.5l-2.5 -2.5l2.5 -2.5z"
        stroke={themeContext.mine_stroke}
      />
    </svg>
  );
}

Mine.propTypes = {
  causeDefeat: PropTypes.bool,
};

Mine.defaultProps = {
  causeDefeat: false,
};

export default Mine;
