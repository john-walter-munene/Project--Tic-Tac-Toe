const gameBoard = (function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    // Create board
    for (let j = 0; j < rows; j++) {
        board[j] = [];
        for (let k = 0; k < columns; k++) {
            board[j].push("");
        }
    }

    // Get board
    const getBoard = () => board;

    // Drop a mark on board slot if empty
    const dropMark = (playerMark, row, column) => {
        if (board[row][column] !== "") return;
        board[row][column] += playerMark;
    };

    // Clear up board
    const clearBoard = () => {
        for (let j = 0; j < rows; j++) {
            board[j] = [];
            for (let k = 0; k < columns; k++) {
                board[j][k] = "";
            }
        }
    };

    return { getBoard, dropMark, clearBoard };
})();

// Player factory
const newPlayer = (playerName, gameMark) => {
    return { playerName, gameMark };
};

const firstPlayer = newPlayer("Player 1", "O");
const secondPlayer = newPlayer("Player 2", "X");

// Game controller
const gamingPad = (function GameController() {
    // Get DOM elements
    const activePlayerIndicator = document.querySelector("h1 + p");
    const boardFrame = document.querySelector('.game-frame');
    const newRoundButton = document.querySelector('.new-round');
    const newGameButton = document.querySelector('.new-game');
    const playerOneScore = document.querySelector(".players p:first-child");
    const playerTwoScore = document.querySelector(".players p:last-child");

    // Define game default parameters
    let playerOneScoreCount = 0;
    let playerTwoScoreCount = 0;
    let activePlayer = firstPlayer;

    // Switch player automatically
    const switchPlayerTurn = () => {
        activePlayer = activePlayer === firstPlayer ? secondPlayer : firstPlayer;
        activePlayerIndicator.textContent = `${activePlayer.playerName}'s Turn`;
    };

    // Clear game on calling new round and reset player turns
    const newPlayRound = () => {
        gameBoard.clearBoard();
        activePlayer = firstPlayer;
        activePlayerIndicator.textContent = `${activePlayer.playerName}'s Turn`;
        displayGame();
        gamingPad.runGame();
    };

    // Drop a mark on selected box in Game
    const dropingMarksInGame = (event) => {
        if (event.target.classList.contains('slot')) {
            const slot = event.target;
            const index = [...slot.parentNode.children].indexOf(slot);
            const row = Math.floor(index / 3);
            const column = index % 3;

            // Drop mark on board, check for winner, update UI on outcome, else switch player turns
            if (slot.textContent !== "") return 
            gameBoard.dropMark(activePlayer.gameMark, row, column);
            const winner = checkWinner();
            const tie = checkTie();
            displayGame();
            if (winner) {
                scoreCounter(winner);
                let message = `${winner} wins!`;
                gameOver(message);
            } else if (tie) {
                let message = "Its a tie!";
                gameOver(message);
            } else {
                switchPlayerTurn();
            }
        }
    };

    // Check for winner.
    const checkWinner = () => {
        let myBoard = gameBoard.getBoard();

        // Define winning combinations.
        let winningCombinations = {
            firstRow: [myBoard[0][0], myBoard[0][1], myBoard[0][2]],
            midRow: [myBoard[1][0], myBoard[1][1], myBoard[1][2]],
            lastRow: [myBoard[2][0], myBoard[2][1], myBoard[2][2]],
            firstColumn: [myBoard[0][0], myBoard[1][0], myBoard[2][0]],
            midColumn: [myBoard[0][1], myBoard[1][1], myBoard[2][1]],
            lastColumn: [myBoard[0][2], myBoard[1][2], myBoard[2][2]],
            firstDiagonal: [myBoard[0][0], myBoard[1][1], myBoard[2][2]],
            lastDiagonal: [myBoard[2][0], myBoard[1][1], myBoard[0][2]],
        };

        // Evaluate for a winner match case.
        for (let winCombo in winningCombinations) {
            let combo = winningCombinations[winCombo];
            if (combo.every(element => element === "O")) {
                return "Player 1";
            } else if (combo.every(element => element === "X")) {
                return "Player 2";
            }
        }
    };

    // Evaluate tie if no more empty slots and winner not declared yet
    const checkTie = () => {
        const board = gameBoard.getBoard();
        const flatBoard = board.flat();
        if (!flatBoard.includes("")) {
            console.log("It's a tie!");
            return true;
        }
    };

    // End game and display winner
    const gameOver = (winnerOrTie) => {
        activePlayerIndicator.textContent = winnerOrTie;
        boardFrame.removeEventListener('click', dropingMarksInGame);
    };

    // Increment scores based on winning player
    const scoreCounter = (player) => {
        if (player === "Player 1") {
            playerOneScoreCount ++;
            updatePlayerScore(playerOneScore, playerOneScoreCount);
        }
        if (player === "Player 2") {
            playerTwoScoreCount++;
            updatePlayerScore(playerTwoScore, playerTwoScoreCount);
        }
    };

    // Update player scores on UI
    const updatePlayerScore = (playerScoreElement, playerCount) => {
        let playerData = playerScoreElement.textContent.split(': ');
        let newPlayerScore = `${playerData[0]}: ${playerCount}`;
        playerScoreElement.textContent = newPlayerScore;
    };

    // Start a new game with zero count on any player
    const resetGame = () => {
        gameBoard.clearBoard();
        playerOneScoreCount = 0;
        playerTwoScoreCount = 0;
        playerOneScore.textContent = "";
        playerTwoScore.textContent = "";
        playerOneScore.textContent += "Player 1 (O): 0";
        playerTwoScore.textContent += "Player 2 (X): 0";
        activePlayer = firstPlayer;
        activePlayerIndicator.textContent = `${activePlayer.playerName}'s Turn`;
        displayGame();
        gamingPad.runGame();
    };

    // Run game by activating right listeners
    const runGame = () => {
        boardFrame.addEventListener('click', dropingMarksInGame);
        newRoundButton.addEventListener('click', newPlayRound);
        newGameButton.addEventListener('click', resetGame);

    };

    return { runGame };
})();

// Function to display the game progress.
let displayGame = function displayGame() {
    const board = gameBoard.getBoard();
    const boardFrame = document.querySelector(".game-frame");

    // Clear the game frame before rendering.
    boardFrame.textContent = ""; 

    // Render board values to UI.
    for (let row = 0; row < board.length; row++) {
        for (let column = 0; column < board[0].length; column++) {
            let box = document.createElement('div');
            box.classList.add('slot');
            box.textContent = `${board[row][column]}`;
            boardFrame.appendChild(box);
        }
    }
};

// Call initial game display and then run game.
displayGame();
gamingPad.runGame();