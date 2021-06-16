const announcement = document.getElementById('announcement');


const Player = (name, symbol) => {
    const move = (targetSquareIdx) => {
        if (!Gameboard.board[targetSquareIdx]) {
            Gameboard.board[targetSquareIdx] = symbol;
            Gameboard.renderBoard();
        } else {
            // Pick a different square!
        }
    }
    return { name, symbol, move }
}

const Gameboard = (() => {
    const board = [];
    const boardCoords = ['a1', 'b1', 'c1', 'a2', 'b2', 'c2', 'a3', 'b3', 'c3']
    const renderBoard = () => {
        for (let i = 0; i < 9; i++) {
            document.querySelectorAll('.square')[i].innerHTML = board[i] ? board[i] : '';
        }
    }
    const isWinner = () => {
        return (
            (board[3] === board[4] && board[4] === board[5] && board[4] !== '') ||
            (board[0] === board[1] && board[1] === board[2] && board[1] !== '') ||
            (board[6] === board[7] && board[7] === board[8] && board[7] !== '') ||
            (board[0] === board[3] && board[3] === board[6] && board[3] !== '') ||
            (board[1] === board[4] && board[4] === board[7] && board[4] !== '') ||
            (board[2] === board[5] && board[5] === board[8] && board[5] !== '') ||
            (board[0] === board[4] && board[4] === board[8] && board[4] !== '') ||
            (board[2] === board[4] && board[4] === board[6] && board[4] !== '') )
    }
    const resetBoard = () => {
        for (let i = 0; i < 9; i++) {
            board[i] = ''
        }
    }

    const isFull = () => {
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                return false;
            }
        }
        return true;
    }
    return { board, boardCoords, renderBoard, resetBoard, isWinner, isFull }
})()

const startButton = document.getElementById('start-button');
startButton.addEventListener('click', (e) => {
    const playerOneName = document.getElementById('player-one').value
    const playerTwoName = document.getElementById('player-two').value
    if (playerOneName && playerTwoName) {
        Game.playGame(playerOneName, playerTwoName);
        // document.getElementById('player-one').value = '';
        // document.getElementById('player-two').value = '';
    } else {
        announcement.innerHTML = "Please enter the names of the players, then click Start to start the game"
    }
})

const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', () => {
    document.getElementById('player-one').value = '';
    document.getElementById('player-two').value = '';
    Gameboard.resetBoard();
    Gameboard.renderBoard();
})


Gameboard.renderBoard();



const Game = ((playerOneName, playerTwoName) => {
    const boardSquares = document.querySelectorAll('.square');
    let targetSquare;
    let currentPlayer;   
    let winner;
    let boardIndex;
       
    
    const playGame = (playerOneName, playerTwoName) => {
        console.log('Game has started')
        const playerOne = Player(playerOneName, 'X');
        const playerTwo = Player(playerTwoName, 'O');
        Gameboard.resetBoard();
        Gameboard.renderBoard();
        let currentPlayer = playerOne;
        let nextTurn = true;
        
        function handleClick (e) {
            let targetSquare = e.target;
            if (Gameboard.isWinner()) {
                console.log(`${winner.name} is the winner!`) 
                announcement.innerHTML = `${winner.name} has won!`
            } else if (Gameboard.isFull()) {
                console.log('Game has ended in a tie!') // never gets logged
                announcement.innerHTML = `The game has ended in a tie!` 
            } else if (targetSquare.innerHTML === 'X' || targetSquare.innerHTML === 'O') {
                announcement.innerHTML = `Please pick a different square, ${currentPlayer.name} - You play with ${currentPlayer.symbol}`
            } else {
                let boardIndex = Gameboard.boardCoords.indexOf(targetSquare.id);
                currentPlayer.move(boardIndex);
                if (Gameboard.isWinner()) {
                    winner = currentPlayer;
                    announcement.innerHTML = `${winner.name} has won!`
                } else if (Gameboard.isFull()) {
                    announcement.innerHTML = `The game has ended in a tie!`
                } else if (!Gameboard.isWinner() && !Gameboard.isFull()) {
                    // Players take turns
                    if (currentPlayer === playerOne) {
                        currentPlayer = playerTwo;
                        nextTurn = true;
                    } else {
                        currentPlayer = playerOne;
                        nextTurn = true;
                    }
                    announcement.innerHTML = `It is ${currentPlayer.name}'s turn, playing with ${currentPlayer.symbol}`;
                }
            }  
        }  

        while (!Gameboard.isFull() && !Gameboard.isWinner() && nextTurn === true) {
            if (Gameboard.isFull() && !Gameboard.isWinner()) {
                console.log("Game over! It's a tie!") // never gets logged
            }   
            announcement.innerHTML = `It is ${currentPlayer.name}'s turn, playing with ${currentPlayer.symbol}`
            console.log(`It is ${currentPlayer.name}'s turn`);
            nextTurn = false;
            document.getElementById("board").addEventListener('click', handleClick)           
        }
        
    }    
    return { playGame, winner }
})()

