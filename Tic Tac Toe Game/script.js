const board = document.getElementById('board');
const cells = board.getElementsByClassName('cell');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');
const overlay = document.querySelector('.win-overlay');
const container = document.querySelector('.container');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

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

const checkWinner = () => {
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return combo; // Return the winning combination
        }
    }
    return gameBoard.includes('') ? null : 'Tie';
};

const handleClick = (event) => {
    const index = event.target.dataset.index;

    if (gameBoard[index] || !isGameActive) return;

    gameBoard[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add(currentPlayer);

    const winner = checkWinner();

    if (winner) {
        if (winner === 'Tie') {
            status.textContent = 'It\'s a Tie!';
        } else {
            status.textContent = `${currentPlayer} Wins!`;
            applyPulseEffect(winner);
            showWinOverlay();
        }
        isGameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;
    }
};

const applyPulseEffect = (combo) => {
    for (let index of combo) {
        cells[index].classList.add('pulse');
    }
};

const showWinOverlay = () => {
    overlay.classList.add('active');
    overlay.innerHTML = `
        <div class="win-message">${currentPlayer} Wins!</div>
    `;
};

const resetGame = () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;

    for (let cell of cells) {
        cell.textContent = '';
        cell.classList.remove('X', 'O', 'pulse');
    }

    // Remove win overlay
    overlay.classList.remove('active');
};

board.addEventListener('click', handleClick);
resetButton.addEventListener('click', resetGame);

resetGame(); // Initialize the game
