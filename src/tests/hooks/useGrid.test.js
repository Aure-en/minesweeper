import { act, renderHook } from '@testing-library/react-hooks';
import useGrid from '../../hooks/useGrid';

describe('Play', () => {
  test('Should update playGrid after a play on a cell that has never been selected before', () => {
    // Initialize a grid.
    const ROWS = 3;
    const COLUMNS = 3;
    const MINES = 3;

    const { result } = renderHook(() => useGrid({
      rows: ROWS,
      columns: COLUMNS,
      mines: MINES,
    }));

    const x = Math.floor(Math.random() * ROWS);
    const y = Math.floor(Math.random() * COLUMNS);

    // playGrid elements the user has not clicked on are null
    expect(result.current.playGrid[x][y]).toBe(null);

    // Play on [x][y]
    act(() => result.current.play(x, y));

    // Checks that playGrid[x][y] content updated to match initialGrid[x][y].
    expect(result.current.playGrid[x][y]).toBe(result.current.initialGrid[x][y]);
  });

  test('Should not update playGrid after a play on a cell that has been selected before', () => {
    // Initialize a grid.
    const ROWS = 3;
    const COLUMNS = 3;
    const MINES = 3;

    const { result } = renderHook(() => useGrid({
      rows: ROWS,
      columns: COLUMNS,
      mines: MINES,
    }));

    const x = Math.floor(Math.random() * ROWS);
    const y = Math.floor(Math.random() * COLUMNS);

    // Play once
    act(() => result.current.play(x, y));
    const content = result.current.playGrid[x][y];

    // Replay and checks that nothing has changed.
    act(() => result.current.play(x, y));
    expect(result.current.playGrid[x][y]).toBe(content);
  });
});

describe('When clicking on an empty cell, all the surrounded empty cells are revealed in playGrid', () => {
  test('Works when the area is in a corner', () => {
    // Initialize a grid.
    const ROWS = 3;
    const COLUMNS = 3;
    const MINES = 3;

    const { result } = renderHook(() => useGrid({
      rows: ROWS,
      columns: COLUMNS,
      mines: MINES,
    }));

    // Define a grid to get some empty cells
    const gridWithEmpty = [
      [0, 0, 0],
      [0, 1, 1],
      [1, 'X', 1],
    ];
    result.current.initialGrid = [...gridWithEmpty];

    // Play on [0][0]
    act(() => result.current.play(0, 0));

    expect(result.current.playGrid).toBe([
      [0, 0, 0],
      [0, 1, null],
      [1, null, null],
    ]);
  });

  test('Works when the area is fully surrounded by numbers', () => {
    // Initialize a grid.
    const ROWS = 4;
    const COLUMNS = 4;
    const MINES = 4;

    const { result } = renderHook(() => useGrid({
      rows: ROWS,
      columns: COLUMNS,
      mines: MINES,
    }));

    // Define a grid to get some empty cells
    const gridWithEmpty = [
      [1, 1, 1, 1],
      [1, 0, 0, 1],
      [1, 0, 1, 1],
      [1, 1, 1, 1],
    ];
    result.current.initialGrid = [...gridWithEmpty];

    // Play on [0][0]
    act(() => result.current.play(0, 0));

    expect(result.current.playGrid).toBe([
      [1, 1, 1, 1],
      [1, 0, 0, 1],
      [1, 0, 1, null],
      [1, 1, 1, null],
    ]);
  });
});
