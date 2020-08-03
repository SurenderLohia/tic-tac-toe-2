const statusMessage = document.querySelector('.game--status');

// Game initial setup
const gameInitialState = new Array(9).fill('');

let gameState = [...gameInitialState];
let currentPlayer = 'X';
let gameActive = true;


// Status Messages
const winningMessage = () => `Player ${currentPlayer} has won`;
const drawMessage = () => 'Game ended in a draw!';
const currentPlayerTurn = () => `It's ${currentPlayer} turn`;

function updateStatusMassage(message) {
  statusMessage.innerHTML = message;
}

updateStatusMassage(currentPlayerTurn())

function handleCellPlayed(currentCell, currentCellIndex) {
  gameState[currentCellIndex] = currentPlayer;
  currentCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateStatusMassage(currentPlayerTurn())
}

function handleResultValidation() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  let roundWon = false;

  for(let i = 0; i < winningCombinations.length; i++) {
    const winningCondition = winningCombinations[i];
    const a = gameState[winningCondition[0]];
    const b = gameState[winningCondition[1]];
    const c = gameState[winningCondition[2]];

    if(a === '' || b === '' || c === 'c') {
      continue;
    }

    if(a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if(roundWon) {
    updateStatusMassage(winningMessage());
    gameActive = false;
    return;
  }

  const roundDraw = !gameState.includes('');
  if(roundDraw) {
    updateStatusMassage(drawMessage());
    gameActive = false;
    return;
  }

  handlePlayerChange();
}


function handleCellClick(e) {
  const currentCell = e.target;
  const currnetCellIndex = parseInt(currentCell.getAttribute('data-cell-index'));

  handleCellPlayed(currentCell, currnetCellIndex);
  handleResultValidation();
}

function handleResetGame() {
  gameState = [...gameInitialState];
  gameActive = true;
  currentPlayer = 'X';

  updateStatusMassage(currentPlayerTurn());
  document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = '');
}

// Attach Events
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick, false));
document.querySelector('.game--restart').addEventListener('click', handleResetGame, false);
