import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

function Flag() {
  const themeContext = useContext(ThemeContext);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-flag-2" width="28" height="28" viewBox="0 0 24 24" strokeWidth="1" stroke={themeContext.flag_stroke} fill={themeContext.flag_fill} strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 14h14v-9h-14v16" />
    </svg>
  );
}

export default Flag;
