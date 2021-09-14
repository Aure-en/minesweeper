import { act, renderHook } from '@testing-library/react-hooks';
import useGame from '../../hooks/useGame';

describe('Play - tryCell', () => {
  test('Should update playGrid after a play on a cell that has never been selected before', () => {
    // Initialize a grid.
    const ROWS = 3;
    const COLUMNS = 3;
    const MINES = 3;

    const { result } = renderHook(() => useGame({
      rows: ROWS,
      columns: COLUMNS,
      mines: MINES,
    }));

    const x = Math.floor(Math.random() * ROWS);
    const y = Math.floor(Math.random() * COLUMNS);

    // playGrid elements the user has not clicked on are null
    expect(result.current.playGrid[x][y]).toBe(null);

    // Play on [x][y]
    act(() => result.current.tryCell(x, y));

    // Checks that playGrid[x][y] content updated to match initialGrid[x][y].
    expect(result.current.playGrid[x][y]).toBe(result.current.initialGrid[x][y]);
  });

  test('Should not update playGrid after a play on a cell that has been selected before', () => {
    // Initialize a grid.
    const ROWS = 3;
    const COLUMNS = 3;
    const MINES = 3;

    const { result } = renderHook(() => useGame({
      rows: ROWS,
      columns: COLUMNS,
      mines: MINES,
    }));

    const x = Math.floor(Math.random() * ROWS);
    const y = Math.floor(Math.random() * COLUMNS);

    // Play once
    act(() => result.current.tryCell(x, y));
    const content = result.current.playGrid[x][y];

    // Replay and checks that nothing has changed.
    act(() => result.current.tryCell(x, y));
    expect(result.current.playGrid[x][y]).toBe(content);
  });

  test('When clicking on an empty cell, all the surrounded empty cells are revealed in playGrid', () => {
    // Initialize a grid.
    const ROWS = 3;
    const COLUMNS = 3;
    const MINES = 3;

    const { result } = renderHook(() => useGame({
      rows: ROWS,
      columns: COLUMNS,
      mines: MINES,
    }));

    /**
     * Define grid with empty cells area
     * Click on one of the empty cells.
     * Check that the surrounding empty area has been revealed.
     */

    // Test 1
    let gridWithEmpty = [
      [0, 0, 0],
      [0, 1, 1],
      [1, 'X', 1],
    ];
    result.current.initialGrid = [...gridWithEmpty];

    act(() => result.current.tryCell(0, 0));

    expect(result.current.playGrid).toBe([
      [0, 0, 0],
      [0, 1, null],
      [1, null, null],
    ]);

    // Test 2
    gridWithEmpty = [
      [1, 1, 1, 1],
      [1, 0, 0, 1],
      [1, 0, 1, 1],
      [1, 1, 1, 1],
    ];
    result.current.initialGrid = [...gridWithEmpty];

    act(() => result.current.tryCell(1, 1));

    expect(result.current.playGrid).toBe([
      [1, 1, 1, 1],
      [1, 0, 0, 1],
      [1, 0, 1, null],
      [1, 1, 1, null],
    ]);
  });
});

describe('Flag - flagCell', () => {
  // Initialize a grid
  let result;
  const ROWS = 3;
  const COLUMNS = 3;
  const MINES = 3;

  beforeEach(() => {
    result = renderHook(() => useGame({
      rows: ROWS,
      columns: COLUMNS,
      mines: MINES,
    })).result;
  });

  test('Can flag an empty cell', () => {
    result.current.playGrid = [[null]];
    act(() => result.current.tryCell(0, 0));
    expect(result.current.playGrid[0][0]).toBe('F');
  });

  test.each([
    ['X'],
    ['F'],
    [0],
    [1],
  ])('Cannot flag a selected cell', (content) => {
    result.current.playGrid = [[content]];
    act(() => result.current.tryCell(0, 0));
    expect(result.current.playGrid[0][0]).toBe(content);
  });
});

describe('Defeat', () => {
  // Initialize a grid
  let result;
  const ROWS = 3;
  const COLUMNS = 3;
  const MINES = 3;

  beforeEach(() => {
    result = renderHook(() => useGame({
      rows: ROWS,
      columns: COLUMNS,
      mines: MINES,
    })).result;
  });

  test('A mine causes defeat', () => {
    result.current.playGrid = [
      ['X', null, null],
      [null, 1, null],
      ['F', 1, null],
    ];

    expect(result.current.checkResult(result.current.playGrid)).toBe('defeat');
  });

  test('A mine causes defeat even if the board is full', () => {
    result.current.playGrid = [
      ['F', 1, 2],
      [1, 'X', 'F'],
      [1, 2, 2],
    ];

    expect(result.current.checkResult(result.current.playGrid)).toBe('defeat');
  });
});

describe('Victory', () => {
  // Initialize a grid.
  let result;
  const ROWS = 3;
  const COLUMNS = 3;
  const MINES = 3;

  beforeEach(() => {
    result = renderHook(() => useGame({
      rows: ROWS,
      columns: COLUMNS,
      mines: MINES,
    })).result;
  });

  test('Victory if all cells that do not contain mines are revealed or flagged', () => {
    result.current.playGrid = [
      ['F', 1, 0],
      [2, 2, 0],
      ['F', 1, 0],
    ];

    expect(result.current.checkResult(result.current.playGrid)).toBe('victory');
  });

  test('Victory if all number cells are revealed, even if not all mines cells are flagged', () => {
    result.current.playGrid = [
      [null, 1, 0],
      [2, 1, 0],
      ['F', 1, 0],
    ];

    expect(result.current.checkResult(result.current.playGrid)).toBe('victory');

    result.current.playGrid = [
      [null, 1, 0],
      [2, 1, 0],
      [null, 1, 0],
    ];

    expect(result.current.checkResult(result.current.playGrid)).toBe('victory');
  });
});

describe('Playing', () => {
  // Initialize a grid.
  let result;
  const ROWS = 3;
  const COLUMNS = 3;
  const MINES = 3;

  beforeEach(() => {
    result = renderHook(() => useGame({
      rows: ROWS,
      columns: COLUMNS,
      mines: MINES,
    })).result;

    result.current.initialGrid = [
      ['X', 'X', 'X'],
      [1, 2, 1],
      [0, 0, 0],
    ];
  });

  test.each([
    [
      [null, 'X', 'X'],
      [1, 2, 1],
      [0, 0, 0],
    ],
    [
      ['F', null, 'F'],
      [1, 2, null],
      [null, 0, null],
    ],
  ])('If all mines have not been discovered and no mine has been triggered, the game continues', (playGrid) => {
    result.current.playGrid = playGrid;
    expect(result.current.checkResult(result.current.playGrid)).toBe('playing');
  });
});
