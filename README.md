# Minesweeper

A simple version of the famous game minesweeper. Hope you enjoy it! ;)

## Rules

- Every turn, the player can either try a cell, pose a flag on a cell or remove it.
- Left click to try a cell
- Right click to toggle flag presence on a cell
- A cell that contains a flag can't be tested as long there's a flag.
- When a player try a cell, the content of the cell is revealed.
- If a player try a cell with no mines surrounding it, all neighboring cells that have no mines surrounding them are revealed.
- Player loses when trying a cell that contains a mine.
- Player wins if all cells without mines are discovered.
- Flag counter represents the maximum number of flags that a player can lay. It corresponds to the number of mines that the grid contains. If the number of flags is superior to the number of mines the counter value gets negative and represents the number of flags to remove.
- % displayed represent the percentage of cells without mines left.

## Features

- Game settings can be modified by clicking on the burger menu located at the bottom right hand corner of the screen.
- Player can switch between dark/light theme by clicking on the icon located at the right of the burger menu.
- After winning/losing, player can restart the game.

## What it looks like

Game is hosted on github : [Test our Minesweeper](https://aure-en.github.io/minesweeper/ "Our Minesweeper hosted on Github")

<img
  src="https://drive.google.com/uc?export=view&id=1K1-_knjckx-ku0EaF9shG2oqL7cDZbv5"
  gif
  width="600px"
  alt="Minesweeper demo"
/>

## Installation

### Requirements

- npm/yarn

### Clone the repository

```sh
git clone git@github.com:Aure-en/lechat.git
cd minesweeper
```

Or get the project repository by downloading ZIP file.

### Install dependancies

Using npm:

```sh
npm install
```

Using yarn:

```sh
yarn
```

### Start

Using npm:

```sh
npm start
```

Using yarn:

```sh
yarn start
```

## Dependancies

- React
- Styled-components
- View more in the [package.json](https://github.com/Aure-en/minesweeper/blob/master/package.json)

Our app has been tested using jest and react-testing-libary.
