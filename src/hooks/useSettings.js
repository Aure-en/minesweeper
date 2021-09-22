import { useState } from 'react';

function useSettings({
  settings, setSettings, setIsCustomFormOpen, setIsModalOpen,
}) {
  // Possible levels of difficulty
  const options = [
    {
      name: 'beginner',
      rows: 9,
      columns: 9,
      mines: 10,
    },
    {
      name: 'intermediate',
      rows: 16,
      columns: 16,
      mines: 40,
    },
    {
      name: 'expert',
      rows: 16,
      columns: 30,
      mines: 99,
    },
    {
      name: 'custom',
      rows: settings.rows,
      columns: settings.columns,
      mines: settings.mines,
    },
  ];

  // Settings that will be applied on form submit.
  const [settingsToApply, setSettingsToApply] = useState(settings);
  const [error, setError] = useState('');

  const handleSettingChange = (e) => {
    setSettingsToApply((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelect = (e) => {
    if (e.target.value === 'custom') {
      // Open the custom form if it is not open
      setIsCustomFormOpen(true);
      setSettingsToApply({
        ...settings,
        name: 'custom',
      });
    } else {
      // Close the custom form if it is open
      setIsCustomFormOpen(false);

      // Set the settings to the corresponding number of rows / columns / mines.
      const option = options.find((setting) => setting.name === e.target.value);
      setSettingsToApply(option);
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    setError('');

    // If the user selects one of the default difficulties, apply it.
    if (['beginner', 'intermediate', 'expert'].includes(settingsToApply.name)) {
      setSettings(settingsToApply);
      return setIsModalOpen(false);
    }

    // If the user select the 'custom' difficulty,
    // → Validate the rows / columns / mines numbers.
    const rows = parseInt(settingsToApply.rows, 10);
    const columns = parseInt(settingsToApply.columns, 10);
    const mines = parseInt(settingsToApply.mines, 10);

    // Check that the 3 fields were filled properly
    if (!rows || !columns || !mines) {
      return setError('Mines, rows and columns must be integers.');
    }

    // Check that the number of mines is possible.
    if (mines >= rows * columns) {
      return setError('There must be at least one free cell.');
    }

    const customSettings = {
      name: 'custom',
      rows,
      columns,
      mines,
    };

    setSettingsToApply(customSettings);
    setSettings(customSettings);
    setIsModalOpen(false);
  };

  return {
    options,
    settingsToApply,
    error,
    handleSelect,
    handleSubmit,
    handleSettingChange,
  };
}

export default useSettings;
