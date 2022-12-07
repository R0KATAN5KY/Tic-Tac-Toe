const X_CLASS = "x";
const O_CLASS = "o";
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const endMessage = document.getElementById("endMessage");
const restartButton = document.getElementById("restartButton");
const endMessageText = document.querySelector("[data-end-message-text]");
let xTurn;

startGame();
restartButton.addEventListener("click", startGame);

function startGame() {
    xTurn = true;
    cells.forEach((cell) => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true });
    });
    showMarkOnHover();
    endMessage.classList.remove("show");
}

function handleClick(event) {
    const cell = event.target;
    const currentClass = xTurn ? X_CLASS : O_CLASS;
    placeMark(cell, currentClass);

    if (checkWin(currentClass)) {
        showWinMessage();
    } else if (isDraw()) {
        showDrawMessage();
    } else {
        changePlayer();
        showMarkOnHover();
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    showMarkOnHover();
}

function changePlayer() {
    xTurn = !xTurn;
}

function showMarkOnHover() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if (xTurn) {
        board.classList.add(X_CLASS);
    } else {
        board.classList.add(O_CLASS);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some((combination) => {
        return combination.every((index) => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

function showWinMessage() {
    endMessageText.innerText = `${xTurn ? "X" : "O"} Wins!`;
    endMessage.classList.add("show");
}

function isDraw() {
    return [...cells].every((cell) => {
        return (
            cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
        );
    });
}

function showDrawMessage() {
    endMessageText.innerText = "Draw!";
    endMessage.classList.add("show");
}