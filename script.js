const chessBoard = document.getElementById('chessBoard');
let selectedSquare = null;
let board = [];

// Initialize the chess board with pieces
function initBoard() {
  const initialBoard = [
    ['Rook_black', 'Knight_black', 'Bishop_black', 'Queen_black', 'King_black', 'Bishop_black', 'Knight_black', 'Rook_black'],
    ['Pawn_black', 'Pawn_black', 'Pawn_black', 'Pawn_black', 'Pawn_black', 'Pawn_black', 'Pawn_black', 'Pawn_black'],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ['Pawn_white', 'Pawn_white', 'Pawn_white', 'Pawn_white', 'Pawn_white', 'Pawn_white', 'Pawn_white', 'Pawn_white'],
    ['Rook_white', 'Knight_white', 'Bishop_white', 'Queen_white', 'King_white', 'Bishop_white', 'Knight_white', 'Rook_white']
  ];

  for (let row = 0; row < 8; row++) {
    board[row] = [];
    for (let col = 0; col < 8; col++) {
      board[row][col] = initialBoard[row][col];
    }
  }
}

// Draw the chessboard
function drawBoard() {
  chessBoard.innerHTML = '';
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement('div');
      square.classList.add('square');
      square.classList.add((row + col) % 2 === 0 ? 'white' : 'black');
      square.dataset.row = row;
      square.dataset.col = col;

      // Add piece to the square
      const piece = board[row][col];
      if (piece) {
        const img = document.createElement('img');
        img.src = `images/${piece}.png`;
        square.appendChild(img);
      }

      // Add event listener to select and move pieces
      square.addEventListener('click', () => handleSquareClick(row, col));
      chessBoard.appendChild(square);
    }
  }
}

// Handle square click
function handleSquareClick(row, col) {
  if (selectedSquare) {
    const [selectedRow, selectedCol] = selectedSquare;
    const piece = board[selectedRow][selectedCol];

    // Move the piece
    if (board[row][col] === null || board[row][col].split('_')[1] !== piece.split('_')[1]) {
      board[row][col] = piece;
      board[selectedRow][selectedCol] = null;
      selectedSquare = null;
      drawBoard();
    } else {
      // Deselect if clicked on the same piece's square
      selectedSquare = null;
      drawBoard();
    }
  } else {
    // Select the piece
    if (board[row][col]) {
      selectedSquare = [row, col];
      drawBoard();
    }
  }
}

// Initialize the game
function initGame() {
  initBoard();
  drawBoard();
}

initGame();
