const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let winner = null;
let winningCombo = [];

function checkWinner() {
  const wins = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6]             // diags
  ];
  for (let combo of wins) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winningCombo = combo; // save winning indexes
      return board[a];
    }
  }
  return board.includes("") ? null : "Draw";
}

function renderBoard() {
  boardElement.innerHTML = "";
  board.forEach((cell, i) => {
    const div = document.createElement("div");
    div.className = "cell";
    div.textContent = cell;

    // ✅ Color classes
    if (cell === "X") div.classList.add("x");
    if (cell === "O") div.classList.add("o");

    // ✅ Highlight winning cells
    if (winner && winner !== "Draw" && winningCombo.includes(i)) {
      div.classList.add("win");
    }

    div.onclick = () => handleMove(i);
    boardElement.appendChild(div);
  });
  statusElement.textContent = winner
  ? (winner === "Draw" ? "It's a Draw!" : `${winner} Wins!`)
  : `Player: ${currentPlayer}`;

// ✅ Add or remove glow class based on winner
if (winner) {
  statusElement.classList.add("win");
} else {
  statusElement.classList.remove("win");
}
}

function handleMove(index) {
  if (board[index] || winner) return;
  board[index] = currentPlayer;
  winner = checkWinner();
  if (!winner) currentPlayer = currentPlayer === "X" ? "O" : "X";
  saveGame();
  renderBoard();
}

function saveGame() {
  fetch("/api/save-game", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ gameId: "game1", board, currentPlayer, winner })
  });
}

renderBoard();
