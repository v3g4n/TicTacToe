
const Player = (name, symbol) => {
    const move = (targetSquare) => {
        if (!board[targetSquare]) {
            board[targetSquare] = symbol;
        } else {
            // Pick a different square!
        }
    }
    return { name, symbol, move }
}

const Gameboard = (() => {
    const board = ['X', 'O', 'O', 'O', 'X', 'X', 'O', 'O', 'X'];
    const renderBoard = () => {
        for (let i = 0; i < 9; i++) {
            document.querySelectorAll('.square')[i].innerHTML = board[i];
        }
    }
    const isWinner = () => {
        return (board[0] === board[1] === board[2] ||
            board[3] === board[4] === board[5] ||
            board[6] === board[7] === board[8] ||
            board[0] === board[3] === board[6] ||
            board[1] === board[4] === board[5] ||
            board[2] === board[5] === board[8] ||
            board[0] === board[4] === board[8] ||
            board[2] === board[4] === board[6])
    }
    const resetBoard = () => {
        board.forEach((square) => square = '')
    }
    return { board, renderBoard, resetBoard, isWinner }
})()

const Game = ((playerOneName, playerTwoName) => {
    let winner;
    const playerOne = Player(playerOneName, 'X');
    const playerTwo = Player(playerTwoName, 'O');
    const playGame = () => {
        while (!Gameboard.board.every(square => square) && !Gameboard.isWinner()) {
            // Players take turns making a move
            playerOne.move(targetSquare);
            if (Gameboard.isWinner()) {
                winner = playerOne;
                break;
            } 
            playerTwo.move(targetSquare);
            if (Gameboard.isWinner()) {
                winner = playerTwo;
                break;
            }
        }
        
    }
    const announceWinner = () => {
        console.log(`${winner.name} is the winner! Congratulations!`)
    }     
    
    return { playGame, announceWinner, winner }
})()

const startButton = document.getElementById('start-button');
startButton.addEventListener('click', (e) => {
    const playerOneName = document.getElementById('player-one').value
    const playerTwoName = document.getElementById('player-one').value
    if (playerOneName && playerTwoName) {
        Game.playGame(playerOneName, playerTwoName);
    }
})

Gameboard.renderBoard();
