
const Player = (name, symbol) => {
    const move = (targetSquareIdx) => {
        if (!Gameboard.board[targetSquareIdx]) {
            Gameboard.board[targetSquareIdx] = symbol;
            Gameboard.renderBoard();
            console.log(`${name} has taken their turn and picked ${targetSquareIdx}`)
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
    return { board, boardCoords, renderBoard, resetBoard, isWinner }
})()

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
        let targetSquare;
        let nextTurn = true;
        console.log(`Board full: ${Gameboard.board.every(square => square)}`)
        console.log(`gameboard: ${Gameboard.board}`)
        console.log(`Winner: ${Gameboard.isWinner()}`)
        

        while (!Gameboard.board.every(square => square) && !Gameboard.isWinner() && nextTurn === true) {
            console.log(`It is ${currentPlayer.name}'s turn`);
            nextTurn = false;
            document.getElementById("board").addEventListener('click', (e) => {
                console.log(`Board full: ${Gameboard.board.every(square => square)}`)
                console.log(`gameboard: ${Gameboard.board}`)
                console.log(`Next turn: ${nextTurn}`)
                targetSquare = e.target;
                console.log(`${targetSquare.id} clicked by ${currentPlayer.name}`)
                if (targetSquare.innerHTML === 'X' || targetSquare.innerHTML === 'O') {
                    console.log('This square cannot be chosen!')
                } else {
                    let boardIndex = Gameboard.boardCoords.indexOf(targetSquare.id);
                    currentPlayer.move(boardIndex);
                    if (Gameboard.isWinner()) {
                        winner = currentPlayer;
                        console.log(`${winner.name} is the winner!`)
                    } else {
                        console.log(`No winner yet`)
                        // Players take turns
                        if (currentPlayer === playerOne) {
                            currentPlayer = playerTwo;
                            nextTurn = true;
                            console.log(`Checked if currentPlayer is playerOne`)
                        } else {
                            currentPlayer = playerOne;
                            nextTurn = true;
                            console.log(`Checked if currentPlayer is playerTwo`)
                        }
                    }  
                }                     
            })           
        }
        if (Gameboard.board.every(square => square) && !Gameboard.isWinner()) {
            console.log("Game over! It's a tie!")
        }
        
    }
    
    
    return { playGame, winner }
})()

const startButton = document.getElementById('start-button');
startButton.addEventListener('click', (e) => {
    const playerOneName = document.getElementById('player-one').value
    const playerTwoName = document.getElementById('player-two').value
    if (playerOneName && playerTwoName) {
        Game.playGame(playerOneName, playerTwoName);
    }
})

Gameboard.renderBoard();


