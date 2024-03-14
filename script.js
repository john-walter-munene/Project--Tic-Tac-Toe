// Game board
let gameBoard = (function Gameboard() {
    // Create my board and populate it with slots;
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let j = 0; j < rows; j++) {
        board[j] = [];
        for (let k = 0; k < columns; k++) {
            board[j].push("");
        }
    }

    const getBoard = () => board;

    const dropMark = (playerMark, row, column) => {
        if (board[row][column] !== "") return;
        board[row][column] += playerMark;
    };

    const printBoard = () => {
        const boardInValueForm = board.map((row) => row.map((cell) => cell));
        console.log(boardInValueForm);
    };

    return { getBoard, dropMark, printBoard };
})();

// Player Factory
const newPlayer = (playerName, gameMark) => {
    return { playerName, gameMark };
};

const firstPlayer = newPlayer("Player 1", "O");
const secondPlayer = newPlayer("Player 2", "X");

// Game controller
let gamingPad = (function GameController() {
    let activePlayer = firstPlayer;

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === firstPlayer ? secondPlayer : firstPlayer;
    };

    const getActivePlayer = () => activePlayer;

const runGame = () => {
    const boardFrame = document.querySelector('.game-frame');

    boardFrame.addEventListener('click', (event) => {
        if (event.target.classList.contains('slot')) {
            const slot = event.target;
            const index = [...slot.parentNode.children].indexOf(slot);
            const row = Math.floor(index / 3);
            const column = index % 3;
            console.log("Hi");
            gameBoard.dropMark(activePlayer.gameMark, row, column);
            gameBoard.printBoard();
            displayGame();
            const winner = checkWinner();
            const tie = checkTie();
            if (winner || tie) {
                console.log("Game Over!");
                // Optionally, you can reset the game or show a message here
            } else {
                switchPlayerTurn();
            }
        }
    });
};


    const checkWinner = () => {
        // Define winning combinations
        let winningCombinations = {
            firstRow: [gameBoard.getBoard()[0][0], gameBoard.getBoard()[0][1], gameBoard.getBoard()[0][2]],
            midRow: [gameBoard.getBoard()[1][0], gameBoard.getBoard()[1][1], gameBoard.getBoard()[1][2]],
            lastRow: [gameBoard.getBoard()[2][0], gameBoard.getBoard()[2][1], gameBoard.getBoard()[2][2]],
            firstColumn: [gameBoard.getBoard()[0][0], gameBoard.getBoard()[1][0], gameBoard.getBoard()[2][0]],
            midColumn: [gameBoard.getBoard()[0][1], gameBoard.getBoard()[1][1], gameBoard.getBoard()[2][1]],
            lastColumn: [gameBoard.getBoard()[0][2], gameBoard.getBoard()[1][2], gameBoard.getBoard()[2][2]],
            firstDiagonal: [gameBoard.getBoard()[0][0], gameBoard.getBoard()[1][1], gameBoard.getBoard()[2][2]],
            lastDiagonal: [gameBoard.getBoard()[2][0], gameBoard.getBoard()[1][1], gameBoard.getBoard()[0][2]],
        };

        // Check for winner

        for (let winCombo in winningCombinations) {
            let combo = winningCombinations[winCombo];
            if (combo.every(element => element === "O")) {
                console.log("Game over! Player O wins.");
                return "Player O";
            } else if (combo.every(element => element === "X")) {
                console.log("Game Over! Player X wins");
                return "Player X";
            }
        }
    };

    const checkTie = () => {
        const board = gameBoard.getBoard();
        const flatBoard = board.flat();
        if (!flatBoard.includes("")) {
            console.log("It's a tie!");
            return true; // Return true to indicate a tie
        }
    };

    return { runGame };
})();

gamingPad.runGame();

// Display Game Progress
function displayGame() {
    const board = gameBoard.getBoard();
    const boardFrame = document.querySelector(".game-frame");

    boardFrame.innerHTML = ""; // Clear the game frame before rendering

    for (let row = 0; row < board.length; row++) {
        for (let column = 0; column < board[0].length; column++) {
            let box = document.createElement('div');
            box.classList.add('slot');
            box.textContent = `${board[row][column]}`;
            boardFrame.appendChild(box);
        }
    }
}

displayGame ();