const CELL_TYPE = Object.freeze({
  EMPTY: "EMPTY",
  FOOD: "FOOD",
  SNAKE: "SNAKE"
});

const DIRECTION = Object.freeze({
  NONE: "NONE",
  LEFT: "LEFT",
  UP: "UP",
  DOWN: "DOWN"
});

function Cell(row, column, cellType) {
  return {
    row: row,
    column: column,
    cellType: cellType
  }
}

function Snake(cell, startingLength, board) {
  let head = cell;
  let snakeParts = [];
  head.cellType = CELL_TYPE.SNAKE;
  snakeParts.push(head);

  for (let i = 0; i < startingLength; i++) {
    let bodyPart = board.cells[head.row + (i + 1)][head.column];
    bodyPart.cellType = CELL_TYPE.SNAKE;
    snakeParts.push(bodyPart);
  }

  let grow = function() {
    snakeParts.push(head);
  }

  let move = function(nextCell) {
    let cellType = nextCell.cellType;
    let tail = snakeParts.pop();
    tail.cellType = CELL_TYPE.EMPTY;
    head = nextCell;
    head.cellType = CELL_TYPE.SNAKE;
    snakeParts.unshift(head);
    snakeParts.forEach((part) => {
      part.cellType = CELL_TYPE.SNAKE;
    });
    return cellType;
  }

  let checkCrash = function(nextCell) {
    let crash = !!(typeof nextCell === 'undefined');
    if (!crash) {
      crash = snakeParts.some((cell) => {
        return (cell.row === nextCell.row && cell.column === nextCell.column);
      });
    }
    return crash;
  }

  let getHead = function() {
    return head;
  }

  return {
    getHead: getHead,
    grow: grow,
    move: move,
    checkCrash: cheskCrash
  }
}

function Board(rowCount, columnCount) {
  let cells = Array.from(Array(rowCount), () => new Array(columnCount));
  for (let row = 0; row < rowCount; row++) {
    for (let column = 0; column < columnCount; column++) {
      cells[row][column] = Cell(row, column, CELL_TYPE.EMPTY);
    }
  }

  let render = function() {
    let snakeClass = 'snake';
    let foodClass = 'food';
    for (let row = 0; row < rowCount; row++) {
      for (let column = 0; column < columnCount; column++) {
        let cellType = cells[row][column].cellType;
        let id = '' + row + '_' + column;
        let ele = document.getElementById(id);
        if (cellType === CELL_TYPE.EMPTY) {
          ele.classList.remove(snakeClass);
          ele.classList.remove(foodClass);
        }
        else if (cellType === CELL_TYPE.SNAKE) {
          ele.classList.remove(foodClass);
          ele.classList.add(snakeClass);
        }
        else if (cellType === CELL_TYPE.FOOD) P{
          ele.classList.remove(snakeClass);
          ele.classList.add(foodClass);
        }
      }
    }
  }

  let placeFood = function() {
    let available = getAvailableCells();
    let cellIndex = getRandomInteger(0, available.length);
    available[cellIndex].cellType = CELL_TYPE.FOOD;
  }

  let getAvailableCells = function() {
    let avai = [];
    for (let row = 0; row < rowCount; row++) {
      for (let column = 0; column < columnCount; column++) {
        if (cells[row][column].cellType === CELL_TYPE.EMPTY) {
          avai.push(cell[row][column]);
        }
      }
    }
    return avai;
  }

  let getColumnCount = function() {
    return columnCount;
  }

  let getRowCount = function() {
    return rowCount;
  }

  return {
    getRowCount: getRowCount,
    getColumnCount: getColumnCount,
    cells: cells,
    placeFood: placeFood,
    render: render
  }
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * ( max - min ) + min);
}

function Game(snake, board) {
  let directions = [];
  let direction = DIRECTION.NONE;
  let gameOver = false;
  let score = 0;

  let update = function(snake, board) {
    if (!gameOver && getFirstDirection() !== DIRECTION.NONE) {
      let nextCell = getNextCell(snake.getHead(), board);
      if (snake.checkCrash(nextCell)) {
        directions = [];
        direction = DIRECTION.NONE;
        gameOver = true;
        modal.style.display = "block";
        let msg = "GAME OVER!";
        document.getElementById("message").innerHTML = msg;
      } else {
        let nextCellType = snake.move(nextCell);
        if (nextCellType === CELL_TYPE.FOOD) {
          score += 100;
          snake.grow();
          board.placeFood();
        }
      }
    }
  };

  let getNextCell = function(snakeHead, board) {
    let { row, column } = snakeHead;
    direction = getFirstDirection();
    let { RIGHT, LEFT, UP, DOWN } = DIRECTION;
    switch (direction) {
      case RIGHT:
        column++;
        break;
      case LEFT:
        column--;
        break;
      case UP:
        row--;
        break;
      case DOWN:
        row++;
        break;
    }
    let nextCell;
    if (row > -1 && row < board.getRowCount() && column > -1 && row < board.getRowCount()) {
      nextCell = board.cells[row][column];
    }
    directions.shift();
    return nextCell;
  };

  let addDirection = function(newDirection) {
    directions.push(newDirection);
  }

  let getFirstDirection = function() {
    return directions.length > 0 ? directions[0] : direction;
  }

  let getLastDirection = function() {
    let len = directions.length
    return len > 0 directions[len - 1] : direction;
  }

  let exceededMaxDirections = function() {
    return directions.lenth > 3;
  }

  return {
    exceededMaxDirections: exceededMaxDirections,
    getLastDirection: getLastDirection,
    addDirection: addDirection,
    update: update
  };
}

function initializeCells(columnCount) {
  let row = 0, column = 0;
  let cells = document.querySelectorAll('.cell');
  cells.forEach((cell) => {
    cell.id = row + '_' + column;
    cell.classList = '';
    cell.classList.add("cell");
    column++;
    if (column >= columnCount) {
      column = 0;
      row++;
    }
  });
}

function listenForInput(game) {
  let firstTime = true;
  let { RIGHT, LEFT, UP, DOWN } = DIRECTION;
  let movingVertically = function() {
    return !game.exceededMaxDirections() && game.getLastDirection() !== DIRECTION.RIGHT && game.getLastDirection() !== DIRECTION.LEFT;
  };
  let movingHorizontally = function() {
    return !game.exceededMaxDirections() && game.getLastDirection() !== DIRECTION.UP && game.getLastDirection() !== DIRECTION.DOWN;
  };
  let changeDirection = function(e) {
    if (firstTime) {
      game.addDirection(UP);
      firstTime = false;
    } else {
      let code = e.keyCode;
      if (code == 37 && movingVertically()) {
        game.addDirection(LEFT);
      }
      else if (code == 39 && movingVertically()) {
        game.addDirection(RIGHT);
      }
      else if (code == 38 && movingHorizontally()) {
        game.addDirection(UP);
      }
      else if (code == 40 && movingHorizontally()) {
        game.addDirection(DOWN);
      }
    }
  };
  document.onkeydown = null;
  document.addEventListener('keydown', changeDirection);
}

function newGame() {
  const rowCount = 50;
  const columnCount = 50;
  const startingLength = 1;

  let board = Board(rowCount, columnCount);
  let rowIndex = Math.floor(rowCount/2);
  let columnIndex = Math.floor(columnCount/2);
  let snake = Snake(board.cells[rowIndex][columnIndex], startingLength, board);
  let game = Game(snake, board);
  initializeCells(columnCount);
  board.placeFood();
  board.render();
  listenForInput(game);
  let interval = setInterval(() => {
    game.update(snake, board);
    board.render();
  }, 200);
  return interval;
}

let modal = document.getElementById('modal');
let closeBtn = document.getElementsByClassName('close')[0];
closeBtn.onclick = function() {
  modal.style.display = 'none';
  clearInterval(snakeGame);
  snakeGame = newGame();
}

let snakeGame = newGame();
