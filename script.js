const board = document.getElementById("board")

board.addEventListener('click', (e)=>{ 
    const card = e.target.closest('.card')
    if(!card) return

    card.classList.toggle('flip')
})