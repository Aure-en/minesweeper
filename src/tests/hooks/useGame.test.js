import { act, renderHook } from '@testing-library/react-hooks';
import useGame from '../../hooks/useGame';
import useGrid from '../../hooks/useGrid';

describe('Play - tryCell', () => {
  test('Should update playGrid after a play on a cell that has never been selected before', () => {
    // Initialize a grid.
    const ROWS = 3;
    const COLUMNS = 3;
    const MINES = 3;

    const { result: gridResult } = renderHook(() => useGrid({
      rows: ROWS,
      columns: COLUMNS,
      mines: MINES,
    }));

    const { result } = renderHook(() => useGame({
      initialGrid: gridResult.current.initialGrid,
      rows: ROWS,
      columns: COLUMNS,
      mines: MINES,
    }));

    const x = Math.floor(Math.random() * ROWS);
    const y = Math.floor(Math.random() * COLUMNS);

    // playGrid elements the user has not clicked on are null
    expect(result.current.playGrid[x][y]).toBe(null);
    // Play on [x][y]
    act(() => result.current.handleLeftClickOnCell(x, y));
    // Checks that playGrid[x][y] content updated to match initialGrid[x][y].
    expect(result.current.playGrid[x][y]).toBe(gridResult.current.initialGrid[x][y] === 'X' ? 'B' : gridResult.current.initialGrid[x][y]);
  });

  test('Should not update playGrid after a play on a cell that has been selected before', () => {
    // Initialize a grid.
    const ROWS = 3;
    const COLUMNS = 3;
    const MINES = 3;

    const { result: gridResult } = renderHook(() => useGrid({
      rows: ROWS,
      columns: COLUMNS,
      mines: MINES,
    }));

    const { result } = renderHook(() => useGame({
      initialGrid: gridResult.current.initialGrid,
      rows: ROWS,
      columns: COLUMNS,
      mines: MINES,
    }));

    const x = Math.floor(Math.random() * ROWS);
    const y = Math.floor(Math.random() * COLUMNS);

    // Play once
    act(() => result.current.handleLeftClickOnCell(x, y));
    const content = result.current.playGrid[x][y];

    // Replay and checks that nothing has changed.
    act(() => result.current.handleLeftClickOnCell(x, y));

    expect(result.current.playGrid[x][y]).toBe(content);
  });

  test('When clicking on an empty cell, all the surrounded empty cells are revealed in playGrid', () => {
    // Initialize a grid.
    let rows = 3;
    let columns = 3;
    let mines = 1;

    let { result: gridResult } = renderHook(() => useGrid({
      rows,
      columns,
      mines,
    }));

    let gridWithEmpty = [
      [0, 0, 0],
      [1, 1, 1],
      [1, 'X', 1],
    ];

    let { result } = renderHook(() => useGame({
      initialGrid: gridWithEmpty,
      generateGrid: gridResult.current.generateGrid,
      rows,
      columns,
      mines,
    }));

    /**
     * Define grid with empty cells area
     * Click on one of the empty cells.
     * Check that the surrounding empty area has been revealed.
     */

    // Test 1
    act(() => gridResult.current.setInitialGrid(gridWithEmpty));
    act(() => result.current.tryCell(0, 0));
    expect(result.current.playGrid).toStrictEqual([
      [0, 0, 0],
      [1, 1, 1],
      [null, null, null],
    ]);

    // Test 2
    rows = 4;
    columns = 4;
    mines = 0;

    gridResult = renderHook(() => useGrid({
      rows,
      columns,
      mines,
    })).result;

    gridWithEmpty = [
      [1, 1, 1, 1],
      [1, 0, 0, 1],
      [1, 0, 1, 1],
      [1, 1, 1, 1],
    ];

    result = renderHook(() => useGame({
      initialGrid: gridWithEmpty,
      generateGrid: gridResult.current.generateGrid,
      rows,
      columns,
      mines,
    })).result;

    act(() => {
      gridResult.current.setInitialGrid(gridWithEmpty);
    });
    act(() => {
      result.current.tryCell(1, 1);
    });
    expect(result.current.playGrid).toStrictEqual([
      [1, 1, 1, 1],
      [1, 0, 0, 1],
      [1, 0, 1, 1],
      [1, 1, 1, null],
    ]);
  });
});

describe('Flag - toggleFlag', () => {
  // Initialize a grid
  let result;
  const ROWS = 1;
  const COLUMNS = 1;
  const MINES = 1;

  const { result: gridResult } = renderHook(() => useGrid({
    rows: ROWS,
    columns: COLUMNS,
    mines: MINES,
  }));

  beforeEach(() => {
    result = renderHook(() => useGame({
      initialGrid: gridResult.current.initialGrid,
      generateGrid: gridResult.current.generateGrid,
      rows: ROWS,
      columns: COLUMNS,
      mines: MINES,
    })).result;
  });

  test('Can flag an empty cell', () => {
    act(() => result.current.setPlayGrid([[null]]));
    act((e) => result.current.toggleFlag(e, 0, 0));
    expect(result.current.playGrid[0][0]).toBe('F');
  });

  test.each([
    ['X'],
    ['F'],
    [0],
    [1],
  ])('Cannot flag a selected cell', (content) => {
    act(() => result.current.setPlayGrid([[content]]));
    act(() => result.current.toggleFlag(0, 0));
    expect(result.current.playGrid[0][0]).toBe(content);
  });
});

describe('Defeat', () => {
  // Initialize a grid
  let result;
  const ROWS = 3;
  const COLUMNS = 3;
  const MINES = 3;

  const { result: gridResult } = renderHook(() => useGrid({
    rows: ROWS,
    columns: COLUMNS,
    mines: MINES,
  }));

  beforeEach(() => {
    result = renderHook(() => useGame({
      initialGrid: gridResult.current.initialGrid,
      gridGenerate: gridResult.current.generateGrid,
      rows: ROWS,
      columns: COLUMNS,
      mines: MINES,
    })).result;
  });

  test('A mine causes defeat', () => {
    act(() => result.current.setPlayGrid([
      ['X', null, null],
      [null, 1, null],
      ['F', 1, null],
    ]));
    // act(() => result.current.checkResult());
    expect(result.current.gameState).toBe('defeat');
  });

  test('A mine causes defeat even if the board is full', () => {
    act(() => result.current.setPlayGrid([
      ['F', 1, 2],
      [1, 'X', 'F'],
      [1, 2, 2],
    ]));
    // act(() => result.current.checkResult());
    expect(result.current.gameState).toBe('defeat');
  });
});

describe('Victory', () => {
  // Initialize a grid.
  let result;
  const ROWS = 3;
  const COLUMNS = 3;
  const MINES = 2;

  const { result: gridResult } = renderHook(() => useGrid({
    rows: ROWS,
    columns: COLUMNS,
    mines: MINES,
  }));

  beforeEach(() => {
    result = renderHook(() => useGame({
      initialGrid: gridResult.current.initialGrid,
      gridGenerate: gridResult.current.generateGrid,
      rows: ROWS,
      columns: COLUMNS,
      mines: MINES,
    })).result;
  });

  test('Victory if all cells that do not contain mines are revealed and all mines are flagged', () => {
    act(() => gridResult.current.setInitialGrid([
      ['X', 1, 0],
      [2, 2, 0],
      ['X', 1, 0],
    ]));
    act(() => result.current.setPlayGrid([
      ['F', 1, 0],
      [2, 2, 0],
      ['F', 1, 0],
    ]));
    expect(result.current.gameState).toBe('victory');
  });

  test('Victory if all number cells are revealed, even if not all mines cells are flagged', () => {
    act(() => result.current.setPlayGrid([
      [null, 1, 0],
      [2, 1, 0],
      ['F', 1, 0],
    ]));
    expect(result.current.gameState).toBe('victory');

    act(() => result.current.setPlayGrid([
      [null, 1, 0],
      [2, 1, 0],
      [null, 1, 0],
    ]));
    expect(result.current.gameState).toBe('victory');
  });
});

describe('Playing', () => {
  // Initialize a grid.
  const ROWS = 3;
  const COLUMNS = 3;
  const MINES = 3;

  const { result: gridResult } = renderHook(() => useGrid({
    rows: ROWS,
    columns: COLUMNS,
    mines: MINES,
  }));

  const { result } = renderHook(() => useGame({
    initialGrid: gridResult.current.initialGrid,
    gridGenerate: gridResult.current.generateGrid,
    rows: ROWS,
    columns: COLUMNS,
    mines: MINES,
  }));

  act(() => gridResult.current.setInitialGrid([
    ['X', 'X', 'X'],
    [1, 2, 1],
    [0, 0, 0],
  ]));

  test('Continue playing if all safe zone are not discovered', () => {
    act(() => result.current.setPlayGrid([
      ['F', 'F', 'F'],
      [1, 2, 1],
      ['F', 0, 0],
    ]));
    act(() => result.current.checkResult());
    expect(result.current.gameState).toBe('playing');

    act(() => result.current.setPlayGrid([
      [null, null, null],
      [1, 2, null],
      [null, 0, null],
    ]));
    act(() => result.current.checkResult());
    expect(result.current.gameState).toBe('playing');
  });
});
