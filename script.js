class TicTacToe {
    constructor() {
        this.playerSetup = document.getElementById('playerSetup');
        this.gameContainer = document.getElementById('gameContainer');
        this.board = document.getElementById('board');
        this.cells = document.querySelectorAll('[data-cell]');
        this.status = document.getElementById('status');
        this.player1Input = document.getElementById('player1');
        this.player2Input = document.getElementById('player2');
        this.player1Display = document.getElementById('player1Name');
        this.player2Display = document.getElementById('player2Name');
        this.score1Display = document.getElementById('score1');
        this.score2Display = document.getElementById('score2');
        this.startButton = document.getElementById('startGame');
        this.resetButton = document.getElementById('resetGame');
        this.newGameButton = document.getElementById('newGame');

        this.scores = { X: 0, O: 0 };
        this.currentPlayer = 'X';
        this.gameActive = false;
        this.board = Array(9).fill('');
        
        this.winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        this.initializeGame();
    }

    initializeGame() {
        this.startButton.addEventListener('click', () => this.startGame());
        this.resetButton.addEventListener('click', () => this.resetBoard());
        this.newGameButton.addEventListener('click', () => this.newGame());
        this.cells.forEach((cell, index) => {
            cell.addEventListener('click', () => this.handleCellClick(cell, index));
        });
    }

    startGame() {
        const player1Name = this.player1Input.value.trim() || 'Player 1';
        const player2Name = this.player2Input.value.trim() || 'Player 2';
        
        this.player1Display.textContent = player1Name;
        this.player2Display.textContent = player2Name;
        
        this.playerSetup.style.display = 'none';
        this.gameContainer.style.display = 'block';
        this.gameActive = true;
        this.updateStatus();
    }

    handleCellClick(cell, index) {
        if (!this.gameActive || this.board[index] !== '' || cell.classList.contains('x') || cell.classList.contains('o')) {
            return;
        }

        this.board[index] = this.currentPlayer;
        cell.classList.add(this.currentPlayer.toLowerCase());
        
        if (this.checkWin()) {
            this.handleWin();
        } else if (this.checkDraw()) {
            this.handleDraw();
        } else {
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            this.updateStatus();
        }
    }

    checkWin() {
        return this.winPatterns.some(pattern => {
            const line = pattern.map(index => this.board[index]);
            return line.every(mark => mark === this.currentPlayer);
        });
    }

    checkDraw() {
        return this.board.every(cell => cell !== '');
    }

    handleWin() {
        this.gameActive = false;
        this.scores[this.currentPlayer]++;
        this.updateScores();
        
        const winningPattern = this.winPatterns.find(pattern => {
            return pattern.every(index => this.board[index] === this.currentPlayer);
        });

        winningPattern.forEach(index => {
            this.cells[index].classList.add('winning');
        });

        const winner = this.currentPlayer === 'X' ? this.player1Display.textContent : this.player2Display.textContent;
        this.status.textContent = `${winner} wins!`;
    }

    handleDraw() {
        this.gameActive = false;
        this.status.textContent = "It's a draw!";
    }

    updateStatus() {
        const currentPlayerName = this.currentPlayer === 'X' ? 
            this.player1Display.textContent : 
            this.player2Display.textContent;
        this.status.textContent = `${currentPlayerName}'s turn`;
    }

    updateScores() {
        this.score1Display.textContent = this.scores['X'];
        this.score2Display.textContent = this.scores['O'];
    }

    resetBoard() {
        this.board = Array(9).fill('');
        this.cells.forEach(cell => {
            cell.className = 'cell';
        });
        this.gameActive = true;
        this.currentPlayer = 'X';
        this.updateStatus();
    }

    newGame() {
        this.scores = { X: 0, O: 0 };
        this.updateScores();
        this.resetBoard();
        this.playerSetup.style.display = 'block';
        this.gameContainer.style.display = 'none';
    }
}

// Initialize the game
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});