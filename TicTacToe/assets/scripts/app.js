let board = ['','','','','','','','',''];
let currentPlayer = "X";
let gameActive = true;

function handleClick(Clicked) {
    if (!gameActive) {
        alert("Game is not active!");
        return;
    }
    if (board[Clicked] !== '') {
        alert("Chosen cell has been taken before! Choose another!");
        return;
    }


    board[Clicked] = currentPlayer;
    document.getElementById(`a${Clicked+1}`).textContent = currentPlayer; 

    
    ifWon();

    
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function ifWon() {
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

    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] === board[b] && board[a] === board[c] && board[a] !== '') {
            gameActive = false;
            document.getElementById(`a${a+1}`).style.color = "darkred"; 
            document.getElementById(`a${b+1}`).style.color = "darkred";
            document.getElementById(`a${c+1}`).style.color = "darkred";
            const winner = currentPlayer;
            setTimeout(function() {
                alert(`${winner} wins!`);
            }, 100);
            return;
        }
    }

  
    if (!board.includes('')) {
        setTimeout(function() {
            alert("It's a draw!");
        }, 100);
        gameActive = false;
        return;
    }
}

function restartGame() {
    currentPlayer = "X";
    board = ['','','','','','','','',''];
    gameActive = true;

    for (let i = 0; i < 9; i++) {
        document.getElementById(`a${i+1}`).textContent = ''; 
        document.getElementById(`a${i+1}`).style.color = "black"; 
    }
}


for (let i = 0; i < 9; i++) {
    document.getElementById(`a${i+1}`).addEventListener("click", function() {
        handleClick(i);
    });
}


document.querySelector("button").addEventListener("click", restartGame);
