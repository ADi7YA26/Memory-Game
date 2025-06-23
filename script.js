const board = document.getElementById("board")
const gameWon = document.querySelector('.game-won')

const boardSize = 4
const cardSymbols = ['🦁', '🐯', '🐼', '🐒', '🦊', '🦓', '🦉', '🐧', '🦢', '🐘'];
const cards = Array.from({length: boardSize*boardSize}, (_, i) => Math.floor(i/2))
let isCardFlipped
let remainingPairs = (boardSize*boardSize)/2
let isFirstFlip, gameLocked, firstCard

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
}

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
                // to avoid data expose
                cardFront.innerText = ""
                firstCard.lastElementChild.textContent = ""
                // reset game state
                isFirstFlip = true
                gameLocked = false
            }, 1000)
        }
    }
})

function handleGameWon(){
    setTimeout(() => {
        board.classList.remove("invisible")
        gameWon.classList.remove('hidden')
        gameWon.classList.add('flex')
    }, 1000)
}

newGame()

// console.log(cards)