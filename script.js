// Game board
let gameBoard = function Gameboard () {
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
    }

    return { getBoard , dropMark, printBoard };
}();

// Player Factory
const newPlayer = (playerName, gameMark) => {
    return { playerName, gameMark };
}

const firstPlayer = newPlayer("Player 1", "O");
const secondPlayer = newPlayer("Player 2", "X");

// Game controller
let gamingPad = function GameController () {
    let activePlayer = firstPlayer;

    const switchPlayerTurn = () => {
        activePlayer = (activePlayer === firstPlayer) ? secondPlayer : firstPlayer;
    };

    const runGame = () => {
        for (let count = 0; count < 9; count++) {

            // Get target cordinates from user
            let targetCell = prompt("Enter corrdinates --> (x,y):");
            let coordinates = targetCell.split(",");
            let latitude = parseInt(coordinates[0]);
            let longitude = parseInt(coordinates[1]);

            // Populate target coordinates and switch to next player
            gameBoard.dropMark(activePlayer.gameMark, latitude, longitude);
            checkWinner();
            if (checkWinner() !== "") break;
            switchPlayerTurn();
        }
        gameBoard.printBoard();
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

        // Check for tie.
        const board = gameBoard.getBoard();
        const flatBoard = board.flat();
        if (!flatBoard.includes("")) {
            console.log("Its a tie!");
            return "tie!"
        }
    };

    return { runGame };
}();

gamingPad.runGame();

// Diplay Game Progress.
let displayGame = (function DisplayGame () {
    // Display game progress.
    // gameBoard.printBoard();
})();