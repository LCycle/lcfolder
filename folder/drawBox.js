document.body.style.backgroundColor = 'rgb(0,25,50)'
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight
const boxSide = 50
const maxBoxesPerLine = Math.floor(innerWidth / boxSide)
const colors = {
    r: 'red', b: 'blue', g: 'green',
    p: 'purple', y: 'yellow', w: 'white', e: 'black' // e de empty
}
let boxes = 0
let lines = 0
function drawBox(color) {
    if (typeof color == 'string') {
        if (boxes >= maxBoxesPerLine) {nextLine()}
        ctx.fillStyle = color
        ctx.fillRect(
            boxes * boxSide,
            lines * boxSide,
            boxSide, boxSide
        )
        boxes++
    } else {
        console.warn('The passed color is not a string')
    }
}
function drawBoxes(str) {
    for (let color of str) {
        if (colors[color]) {drawBox(colors[color])}
    }
}
function nextLine() {
    lines++
    boxes = 0
}


// loopcycle 8D
drawBoxes('bbbbbbbbb')
nextLine()
drawBoxes('bbeebeebb')
nextLine()
drawBoxes('bebbebbeb')
nextLine()
drawBoxes('bbeebeebb')
nextLine()
drawBoxes('bbbbbbbbb')
nextLine()
drawBoxes('bbeeeeebb')
nextLine()
drawBoxes('bbbeeebbb')
nextLine()
drawBoxes('bbbbbbbbb')