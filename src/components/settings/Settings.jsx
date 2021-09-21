import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { useTheme } from 'styled-components';
import ReactModal from 'react-modal';
import Theme from './Theme';
import Select from './Select';
import Custom from './Custom';
import useSettings from '../../hooks/useSettings';
import { ReactComponent as IconSettings } from '../../assets/settings/menu.svg';

const Settings = ({ settings, setSettings }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCustomFormOpen, setIsCustomFormOpen] = useState(settings.name === 'custom');
  const {
    options,
    error,
    settingsToApply,
    handleSelect,
    handleSubmit,
    handleSettingChange,
  } = useSettings({
    settings,
    setSettings,
    setIsCustomFormOpen,
    setIsModalOpen,
  });
  const themeContext = useTheme();

  return (
    <>
      <Buttons>
        <Button type="button" onClick={() => setIsModalOpen(true)}>
          <IconSettings />
        </Button>
        <Theme />
      </Buttons>

      {/* Form to change difficulty */}
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={{
          overlay: {
            background: themeContext.overlay,
          },
          content: {
            maxWidth: '30rem',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: themeContext.bg_primary,
            border: `1px solid ${themeContext.text_primary}`,
            height: 'min-content',
          },
        }}
      >
        <Container>
          <Heading>Settings</Heading>

          <Form onSubmit={handleSubmit}>
            {/* Select between easy, medium, difficult, custom */}
            <Select
              options={options}
              handleSelect={handleSelect}
              current={
                options.find((option) => option.name === settingsToApply.name)?.name || 'custom'
              }
            />

            {/* Inputs for custom settings */}
            {isCustomFormOpen && (
              <Custom
                settingsToApply={settingsToApply}
                handleSettingChange={handleSettingChange}
                error={error}
              />
            )}

            <small>
              Please be careful, updating the difficulty will reset the game.
            </small>

            <button type="submit">Apply</button>
          </Form>
        </Container>
      </ReactModal>
    </>
  );
};

Settings.propTypes = {
  settings: PropTypes.shape({
    name: PropTypes.oneOf(['beginner', 'intermediate', 'difficult', 'custom'])
      .isRequired,
    rows: PropTypes.number.isRequired,
    columns: PropTypes.number.isRequired,
    mines: PropTypes.number.isRequired,
  }).isRequired,
  setSettings: PropTypes.func.isRequired,
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const Heading = styled.h2`
  line-height: 3rem;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  & > small {
    color: ${(props) => props.theme.text_secondary};
    font-size: 0.825rem;
    text-align: center;
    padding: 0.5rem 0;
  }

  & > button {
    align-self: center;
    border: 1px solid ${(props) => props.theme.button};
    color: ${(props) => props.theme.button};
    background: transparent;
    align-self: center;
    padding: 0.3rem 1rem;
    border-radius: 3px;
    cursor: pointer;

    &:hover {
      border: 1px solid ${(props) => props.theme.button_hover};
      color: ${(props) => props.theme.button_hover};
    }
  }
`;

const Buttons = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 1rem;
  right: 1rem;
`;

const Button = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme.text_primary};

  &:focus {
    outline: 2px solid transparent;
  }
`;

export default Settings;
