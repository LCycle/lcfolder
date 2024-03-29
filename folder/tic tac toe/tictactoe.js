const gridSide = innerWidth/3
const slotSide = gridSide/3
const ximageLink = 'https://cdn-icons-png.flaticon.com/512/109/109602.png'
const oImageLink = 'https://www.pngplay.com/wp-content/uploads/12/Round-Circle-PNG-Photos.png'
const gridImageLink = 'https://upload.wikimedia.org/wikipedia/commons/6/64/Tic-tac-toe.png'
const roundText = document.createElement('h1')
document.body.appendChild(roundText)
const grid = document.createElement('img')
document.body.appendChild(grid)
grid.style.position = 'absolute'
grid.style.width = grid.style.height = gridSide
grid.style.left = (innerHeight-gridSide)/2
const slots = []
for (let line = 1; i <= 3; i++) {
    for (let collumn = 1; i <= 3; i++) {
        let slot = document.createElement('img')
        document.body.appendChild(slot)
        slot.style.position = 'absolute'
        slot.style.width = slot.style.height = slotSide
        slot.style.left = (innerWidth-gridSide)/2+collumn*slotSide

    }
}