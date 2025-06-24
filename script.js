const board = document.getElementById("board")
const gameWon = document.querySelector('.game-won')
const timerEle = document.querySelector(".game-detail .time")
const movesEle = document.querySelector(".game-detail .moves")
const pauseResumeBtn = document.getElementById("pause-game")
const newGameBtn = document.getElementById("new-game")

const boardSize = 4
const cardSymbols = ['🦁', '🐯', '🐼', '🐒', '🦊', '🦓', '🦉', '🐧', '🦢', '🐘'];
const cards = Array.from({length: boardSize*boardSize}, (_, i) => Math.floor(i/2))
let isCardFlipped
let remainingPairs = (boardSize*boardSize)/2
let isFirstFlip, gameLocked, firstCard, moves, isGamePaused
let timerId

let timer = 0

const cardState = Object.fromEntries(
  Array.from({ length: boardSize * boardSize }, (_, i) => [
    i, 
    { isFlipped: false, isMatched: false }
  ])
);

// Fisher–Yates Shuffle
function shuffle(array) {
    var m = array.length, t, i;
    
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}

function createCard(id){
    const card = document.createElement('div')
    card.classList.add('card')
    card.dataset.cardId = id

    const cardBack = document.createElement('div')
    cardBack.classList.add('card-back')
    cardBack.textContent = "?"
    card.appendChild(cardBack)


    const cardFront = document.createElement('div')
    cardFront.classList.add('card-front')
    card.appendChild(cardFront)

    return card
}

function newGame(){
    shuffle(cards)
    gameLocked = false
    isFirstFlip = true
    firstCard = null
    remainingPairs = (boardSize*boardSize)/2
    isCardFlipped = Array.from({length: boardSize*boardSize}, () => false)
    gameWon.classList.add('hidden')
    gameWon.classList.remove('flex')

    // initialize board
    board.classList.remove("invisible")
    board.innerHTML = ""
    for(let i=0; i < boardSize*boardSize; i++){
        const card = createCard(i)
        board.appendChild(card)
    }

    moves = 0
    timer = 0
    if(timerId) clearInterval(timerId)
    updateMoves()
    startTimer()

    pauseResumeBtn.hidden = false
    isGamePaused = false
    pauseResumeBtn.textContent = "Pause"
}


newGameBtn.addEventListener('click', newGame)

pauseResumeBtn.addEventListener('click', pauseGame)

board.addEventListener('click', (e)=>{ 
    const card = e.target.closest('.card')
    const cardId = card?.dataset.cardId
    if(!card || gameLocked || isCardFlipped[cardId]) return

    isCardFlipped[cardId] = true
    card.classList.add('flip')
    const cardFront = card.querySelector('.card-front')
    cardFront.innerText = cardSymbols[cards[cardId]]

    if(isFirstFlip){
        firstCard = card
        isFirstFlip = false

    }else{
        moves++
        updateMoves()
        gameLocked = true
        const firstCardId = firstCard.dataset.cardId
        const cardMatched = cards[firstCardId] === cards[cardId]

        if(cardMatched){
            firstCard.classList.add('matched')
            card.classList.add('matched')
            remainingPairs--

            firstCard = null
            gameLocked = false
            isFirstFlip = true

            if(remainingPairs === 0){
                handleGameWon()
            }
        }else{ 
            setTimeout(() => {
                // unflip the cards
                firstCard.classList.remove('flip')
                card.classList.remove('flip')
                isCardFlipped[firstCardId] = false
                isCardFlipped[cardId] = false
                // empty the card content to avoid data expose
                firstCard.querySelector('.card-front').innerText = ""
                card.querySelector('.card-front').innerText = ""
                // reset game state
                isFirstFlip = true
                gameLocked = false
            }, 1000)
        }
    }
})

document.addEventListener("visibilitychange", () => {
    if (!isGamePaused && !gameLocked && remainingPairs > 0) {
        pauseGame();
    }
});


function handleGameWon(){
    clearInterval(timerId)
    isGamePaused = true
    gameLocked = true
    pauseResumeBtn.hidden = true;
    setTimeout(() => {
        board.classList.add("invisible")
        gameWon.classList.remove('hidden')
        gameWon.classList.add('flex')
    }, 1000)
}

newGame()
pauseGame()
pauseResumeBtn.hidden = true

// console.log(cards)


// ------------timer------------
function updateTimer(){
    const minuteDisplay = String(Math.floor(timer/60)).padStart(2,"0")
    const secondDisplay = String(timer%60).padStart(2,"0")

    timerEle.innerText = `${minuteDisplay}:${secondDisplay}`
}

function startTimer(){
    timerId = setInterval(()=> {
        timer++;
        updateTimer()
    }, 1000)
}

function pauseGame(){
    if (!isGamePaused) {
        isGamePaused = true
        gameLocked = true
        clearInterval(timerId)
        pauseResumeBtn.textContent = "Resume"
    } else {
        isGamePaused = false
        gameLocked = false
        startTimer()
        pauseResumeBtn.textContent = "Pause"
    }
}

function updateMoves(){
    movesEle.innerText = moves
}
