let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box'));
let O_Win = document.getElementById('O_Win');
let X_Win = document.getElementById('X_Win');
const O_Text = "O";
const X_Text = "X";
let O_Wins = 0;
let X_Wins = 0;

indicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')
draw = getComputedStyle(document.body).getPropertyValue('--draw-blocks')

let currentPlayer = X_Text;
let spaces = Array(9).fill(null);
let moves = 9
const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

function boxClicked (e) {
    const id = e.target.id
   
    if (spaces[id] == null && moves<=9) {
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer
        if (currentPlayer == X_Text) {
            currentPlayer = O_Text
            moves--
        }
        else {
            currentPlayer = X_Text
            moves--
        }
    }
    else if (spaces[id] !== null && moves<=9) {
        alert ('choose another box')
    }
    else if (moves == 10 && currentPlayer == O_Text) {
        alert ('press the "New Game"')
        X_Wins = X_Wins - 2
    }
    else if (moves == 10 && currentPlayer == X_Text) {
        alert ('press the "New Game"')
        O_Wins = O_Wins - 2
    }
if (playerHasWon() !== false) {
    
    let winning_blocks = playerHasWon()
    winning_blocks.forEach(box => boxes[box].style.backgroundColor=indicator)
    moves = 10
}
if (moves == 0) {
    playerText.innerText = 'Draw'
        boxes.forEach(box => {
                box.style.backgroundColor = draw
    })
    
}
}
restartBtn.addEventListener('click', restart)

function restart (){
    spaces.fill(null)
    currentPlayer = X_Text
    boxes.forEach(box => {
        box.innerText = ''
        box.style.backgroundColor = ''
    })
    playerText.innerText = 'Tic Tac Toe'
    moves = 9
    
}
const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerHasWon () {
    for (const num of winningCombos) {
        let [a,b,c] = num
        if (spaces[a] &&(spaces[a] == spaces[b] && spaces[a] == spaces[c])){
            playerText.innerText = `${spaces[a]} has won`       
            if (spaces[a] == 'O'){
                O_Wins++
                O_Win.innerText = `${O_Wins/2}`    
            }
            else {
                X_Wins++
                X_Win.innerText = `${X_Wins/2}`      
            }
            return [a,b,c]
        }
    }
    return false
}

startGame()
