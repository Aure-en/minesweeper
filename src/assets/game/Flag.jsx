import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';

function Flag({ outer }) {
  const themeContext = useContext(ThemeContext);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-flag-2"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      strokeWidth="1"
      stroke={outer ? themeContext.flag_stroke_outer : themeContext.flag_stroke}
      fill={outer ? themeContext.flag_fill_outer : themeContext.flag_fill}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>flag</title>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 14h14v-9h-14v16" />
    </svg>
  );
}

Flag.propTypes = {
  outer: PropTypes.bool,
};

Flag.defaultProps = {
  outer: false,
};

export default Flag;
