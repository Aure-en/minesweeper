# HOOKS

---

## useSettings

### Parameters

- difficulty
- rows
- columns
- mines

### States

- difficulty
- rows
- columns
- mines
- configured

### Methods

- ?

### Return values

- rows
- columns
- mines
- difficulty

---

## useGrid

### Parameters

- rows
- columns
- mines

### States

- initialGrid

### Methods

- addNumbersToGrid
- checkAvailable
- generateCoords
- addMineToCell
- addMinesToGrid
- generateGrid

### Return values

- initialGrid

---

## useGame

### Parameters

- initialGrid
- rows
- columns
- mines

### States

- playGrid
- gameState

### Methods

- handleLeftClickOnCell
- handleRightClickOnCell

- tryCell
- revealCell
- revealZone
- revealGrid
- toggleFlag
- checkResult

### Return values

- playGrid
- handleLeftClickOnCell
- handleRightClickOnCell

---

## useStats

### States

- minesToDiscover
- percSafeCellsToDiscover

### Parameters

- playGrid
- mines

### Return values

- minesToDiscover- minesToDiscover
- percSafeCellsToDiscover

---

# Utlisation

```js
{} = useSettings();
```
