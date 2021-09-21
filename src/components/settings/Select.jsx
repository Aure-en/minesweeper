import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Select = ({ current, options, handleSelect }) => (
  <Label htmlFor="difficulty">
    Difficulty
    <StyledSelect id="difficulty" onChange={handleSelect}>
      {options.map((setting) => (
        <option selected={current === setting.name}>{setting.name}</option>
      ))}
    </StyledSelect>
  </Label>
);

Select.propTypes = {
  current: PropTypes.oneOf(['beginner', 'intermediate', 'difficult', 'custom'])
    .isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      rows: PropTypes.number,
      columns: PropTypes.number,
      mines: PropTypes.number,
    }),
  ).isRequired,
  handleSelect: PropTypes.func.isRequired,
};

const Label = styled.label`
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  font-size: 0.825rem;
  letter-spacing: 1px;
`;

const StyledSelect = styled.select`
  font-family: 'Assistant', 'Trebuchet MS', sans-serif;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.text_secondary};
  padding: 0.5rem 0 0.25rem 0;
  background: transparent;
  text-transform: capitalize;
  color: ${(props) => props.theme.text_primary};

  & > option {
    text-transform: capitalize;
    color: ${(props) => props.theme.text_primary};
    background: ${(props) => props.theme.cell_bg_selected_primary};
  }

  &:focus {
    outline: 2px solid transparent;
  }
`;

export default Select;
