import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Custom = ({ settingsToApply, handleSettingChange, error }) => (
  <Wrapper>
    <Container>
      <Label htmlFor="rows">
        Rows
        <Input
          type="text"
          id="rows"
          name="rows"
          value={settingsToApply.rows}
          onChange={handleSettingChange}
        />
      </Label>

      <Label htmlFor="columns">
        Columns
        <Input
          type="text"
          id="columns"
          name="columns"
          value={settingsToApply.columns}
          onChange={handleSettingChange}
        />
      </Label>

      <Label htmlFor="mines">
        Mines
        <Input
          type="text"
          id="mines"
          name="mines"
          value={settingsToApply.mines}
          onChange={handleSettingChange}
        />
      </Label>
    </Container>
    {error && <Error>{error}</Error>}
  </Wrapper>
);

Custom.propTypes = {
  settingsToApply: PropTypes.shape({
    rows: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    columns: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    mines: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
  }).isRequired,
  handleSettingChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

Custom.defaultProps = {
  error: '',
};

const Wrapper = styled.div`
  margin: 2rem 0;
`;

const Container = styled.div`
  display: flex;
  width: 100%;

  & > * {
    flex: 1;
  }
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  font-size: 0.825rem;
  letter-spacing: 1px;
`;

const Input = styled.input`
  font-family: 'Assistant', 'Trebuchet MS', sans-serif;
  color: ${(props) => props.theme.text_primary};
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.text_secondary};
  padding: 0.5rem 0 0.25rem 0;
  width: 3rem;
  background: transparent;
  text-align: center;

  &:focus {
    outline: 2px solid transparent;
  }
`;

const Error = styled.small`
  color: ${(props) => props.theme.text_secondary};
  font-size: 0.825rem;
  text-align: center;
  margin-top: 1rem;
`;

export default Custom;
