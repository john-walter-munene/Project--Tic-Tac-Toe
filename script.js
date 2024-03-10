// Game board
let gameBoard = function Gameboard () {
    // Create my board and populate it with slots;
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let j = 0; j < rows; j++) {
        board[j] = [];
        for (let k = 0; k < columns; k++) {
            board[j].push(CreateCell());
        }
    }

    const getBoard = () => board;

    const dropMark = (player, row, column) => {
        let targetCell = board[row][column];

        if (targetCell != "") return;

        targetCell.addMark(player);
    };

    const printBoard = () => {
        const boardInValueForm = board.map((row) => row.map((cell) => cell.getCellValue()));
        console.log(boardInValueForm);
    }

    return { getBoard , dropMark, printBoard};
}();

// Cells for board

function CreateCell() {
    let cellValue = "";

    const getCellValue = () => cellValue;

    const addMark = (player) => {
        cellValue = player.gameMark;
    }

    return { getCellValue, addMark };
}

// Player Factory
const newPlayer = (playerName, gameMark) => {
    return { playerName, gameMark};
}

// Game controller
let gamingPad = function GameController () {
    const firstPlayer = newPlayer("Player 1", "O");
    const secondPlayer = newPlayer("Player 2", "X");

    let activePlayer = firstPlayer;

    const switchPlayerTurn = () => {
        activePlayer = (activePlayer === firstPlayer) ? secondPlayer : firstPlayer;
    }

    const runGame = () => {
        for (let count = 0; count < 9; count++) {
            switchPlayerTurn();
            console.log(activePlayer);
        }
    }

    return { runGame };
}();

gamingPad.runGame();

// Diplay Game Progress.
let displayGame = (function DisplayGame () {
    // Display game progress.
    console.log(gameBoard.getBoard());
})();