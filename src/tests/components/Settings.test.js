import React from 'react';
import Modal from 'react-modal';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ThemeProvider } from '../../context/ThemeContext';
import Settings from '../../components/settings/Settings';
import App from '../../App';

describe('Renders properly', () => {
  beforeEach(() => {
    render(
      <ThemeProvider>
        <Settings
          settings={{
            name: 'beginner',
            rows: 9,
            columns: 9,
            mines: 10,
          }}
          setSettings={() => {}}
        />
      </ThemeProvider>,
    );
  });

  test('Theme and difficulty buttons are rendered', () => {
    expect(screen.getByRole('button', { name: /theme/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /settings/i })).toBeInTheDocument();
  });
});

test('Settings modal can be opened', () => {
  // Setup
  render(
    <div id="root">
      <App />
    </div>,
  );
  Modal.setAppElement('#root');

  // Clicks on the button to open the modal and checks that it has been opened.
  const settingsButton = screen.getByRole('button', { name: /settings/i });
  userEvent.click(settingsButton);
  const modalTitle = screen.getByRole('heading', { name: /settings/i });
  expect(modalTitle).toBeInTheDocument();
});

describe('Default difficulties', () => {
  beforeEach(() => {
    // Render and opens the modal.
    render(
      <div id="root">
        <App />
      </div>,
    );
    Modal.setAppElement('#root');

    const settingsButton = screen.getByRole('button', { name: /settings/i });
    userEvent.click(settingsButton);
  });

  test.each([
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
  ])('%o difficulty can be selected', (difficulty) => {
    // Select the beginner difficulty
    const select = screen.getByRole('combobox', { name: /difficulty/i });
    userEvent.selectOptions(select, difficulty.name);
    expect(screen.getByRole('option', { name: difficulty.name }).selected).toBe(true);

    // Apply changes
    const submitButton = screen.getByRole('button', { name: /apply/i });
    userEvent.click(submitButton);

    /**
     * Checks that the difficulty has changed to beginner by checking:
     * - Number of mines displayed
     * - Number of rows
     * - Number of columns
     */

    // Number of mines
    expect(screen.getByText(difficulty.mines)).toBeInTheDocument();

    // Number of rows and columns;
    const lastCell = document.querySelector(`[data-x='${difficulty.rows - 1}'][data-y='${difficulty.columns - 1}']`);
    const extraCell = document.querySelector(`[data-x='${difficulty.rows}'][data-y='${difficulty.rows}']`);
    expect(lastCell).toBeDefined();
    expect(extraCell).not.toBeDefined();
  });
});

describe('Custom difficulty', () => {
  beforeEach(() => {
    // Render
    render(
      <div id="root">
        <App />
      </div>,
    );
    Modal.setAppElement('#root');

    // Open the modal
    const settingsButton = screen.getByRole('button', { name: /settings/i });
    userEvent.click(settingsButton);

    // Select the custom difficulty
    const select = screen.getByRole('combobox', { name: /difficulty/i });
    userEvent.selectOptions(select, 'custom');
  });

  test.each([
    /rows/i,
    /columns/i,
    /mines/i,
  ])('User must indicate a number of rows, columns and mines', (input) => {
    // Erase input field
    const inputElem = screen.getByRole('textbox', { name: input });
    userEvent.clear(inputElem);

    // Try to apply changes
    const submitButton = screen.getByRole('button', { name: /apply/i });
    userEvent.click(submitButton);

    expect(screen.getByText('Mines, rows and columns must be integers.')).toBeInTheDocument();
  });

  test.only('User must leave at least 1 free cell', () => {
    const IMPOSSIBLE_SETTINGS = {
      rows: 10,
      columns: 10,
      mines: 100,
    };

    // Fill inputs with bad values
    const inputRows = screen.getByRole('textbox', { name: /rows/i });
    userEvent.clear(inputRows);
    userEvent.type(inputRows, IMPOSSIBLE_SETTINGS.rows);

    const inputColumns = screen.getByRole('textbox', { name: /columns/i });
    userEvent.clear(inputColumns);
    userEvent.type(inputColumns, IMPOSSIBLE_SETTINGS.columns);

    const inputMines = screen.getByRole('textbox', { name: /mines/i });
    userEvent.clear(inputMines);
    userEvent.type(inputMines, IMPOSSIBLE_SETTINGS.mines);

    // Try to apply changes
    const submitButton = screen.getByRole('button', { name: /apply/i });
    userEvent.click(submitButton);

    expect(screen.getByText('There must be at least one free cell.')).toBeInTheDocument();
  });

  test('Custom difficulty can be applied', () => {
    const SETTINGS = {
      rows: 3,
      columns: 3,
      mines: 3,
    };

    // Fill inputs
    const inputRows = screen.getByRole('textbox', { name: /rows/i });
    userEvent.clear(inputRows);
    userEvent.type(inputRows, SETTINGS.rows);

    const inputColumns = screen.getByRole('textbox', { name: /columns/i });
    userEvent.clear(inputColumns);
    userEvent.type(inputColumns, SETTINGS.columns);

    const inputMines = screen.getByRole('textbox', { name: /mines/i });
    userEvent.clear(inputMines);
    userEvent.type(inputMines, SETTINGS.mines);

    // Apply changes
    const submitButton = screen.getByRole('button', { name: /apply/i });
    userEvent.click(submitButton);

    // Number of mines
    expect(screen.getByText(SETTINGS.mines)).toBeInTheDocument();

    // Number of rows and columns;
    const lastCell = document.querySelector(`[data-x='${SETTINGS.rows - 1}'][data-y='${SETTINGS.columns - 1}']`);
    const extraCell = document.querySelector(`[data-x='${SETTINGS.rows}'][data-y='${SETTINGS.columns}']`);
    expect(lastCell).toBeDefined();
    expect(extraCell).not.toBeDefined();
  });
});
