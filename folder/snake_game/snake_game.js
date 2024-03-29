const msg = document.createElement('h1')
document.body.appendChild(msg)
msg.style.left = innerWidth/2-100+'px'
msg.style.bottom = innerHeight/2+100+'px'
msg.innerHTML = 'WASD to start'

const step = 100

const snake = document.createElement('span')
document.body.appendChild(snake)
const snakeData = { 
    x: (innerWidth/2)-(innerWidth%step),
    y: (innerHeight/2)-(innerHeight%step),
    w: step,
    h: step
}
snake.style.left = snakeData.x+'px'
snake.style.top = snakeData.y+'px'
snake.style.width = snakeData.w+'px'
snake.style.height = snakeData.h+'px'

class Apple {
    constructor() {
        this.x = 0
        this.y = 0
        this.w = 50
        this.h = 50
        this.span = document.createElement('span')
        document.body.appendChild(this.span)
        this.span.style.width = this.w
        this.span.style.height = this.h
        this.span.style.backgroundColor = 'red'
    }
    change() {
        this.x = (Math.floor(Math.random()*(Math.floor(innerWidth/step)-2)))*step+step
        this.y = (Math.floor(Math.random()*(Math.floor(innerHeight/step)-2)))*step+step
        this.span.style.left = this.x
        this.span.style.top = this.y
    }
}

let keyCodes = [87,65,83,68]

let game = 'starting'
let direction 
let canChange = true
document.addEventListener('keydown',({ keyCode })=>{
    if (game !== 'over' && canChange) {
        if (game === 'starting' && keyCodes.includes(keyCode)) {
            msg.innerHTML = 'Score: 0'
            game = 'running'
        }
        if (direction === undefined) {
            switch (keyCode) {
                case 87:
                    direction = 'up'
                    break
                case 65:
                    direction = 'left'
                    break
                case 83:
                    direction = 'down'
                    break
                case 68:
                    direction = 'right'
                    break
            }
            canChange = false
        } else {
            switch (direction) {
                case 'down':
                case 'up':
                    switch (keyCode) {
                        case 65: 
                            direction = 'left'
                            break
                        case 68:
                            direction = 'right'
                            break
                    }
                    break
                case 'right':
                case 'left':
                    switch (keyCode) {
                        case 87:
                            direction = 'up'
                            break
                        case 83:
                            direction = 'down'
                    }
            }
            canChange = false
        }
    }
})

let apple = new Apple()
apple.change()

let tailParts = []
function addTail() {
    let tail = document.createElement('span')
    document.body.appendChild(tail)
    let styles = {
        backgroundColor: 'rgba(0,70,70)',
        width: snakeData.w+'px',
        height: snakeData.h+'px'
    }
    for (let i in styles) {
        tail.style[i] = styles[i]
    }
    let X
    let Y
    if (tailParts.length === 0) {
        X = snakeData.x
        Y = snakeData.y
    } else {
        let last = tailParts[tailParts.length-1]
        X = last.x
        Y = last.y
    }
    tail.style.left = X
    tail.style.top = Y
    tailParts.push({x: X,y: Y, part: tail})
}

function moveTails(){
    for (let i = tailParts.length-1; i >= 0; i--) {
        let tail = tailParts[i]
        if (i === 0) {
            tail.x = snakeData.x
            tail.y = snakeData.y
        } else {
            tail.x = tailParts[i-1].x
            tail.y = tailParts[i-1].y
        }
        tail.part.style.left = tail.x
        tail.part.style.top = tail.y
    }
}

function checkTailHit() {
    let result = false
    for (let tail of tailParts) {
        if (snakeData.x+snakeData.w > tail.x && snakeData.y+snakeData.h > tail.y && 
        snakeData.y < tail.y+snakeData.h && snakeData.x < tail.x+snakeData.w) {
            result = true
        }
    }
    return result
}

let update = setInterval(()=>{
    if (game !== 'starting') {
        moveTails()
        switch (direction) {
            case 'up':
                snakeData.y -= step
                break
            case 'left':
                snakeData.x -= step
                break
            case 'down':
                snakeData.y += step
                break
            case 'right':
                snakeData.x += step
        }
        canChange = true
        if (snakeData.x + snakeData.w < innerWidth && 
        snakeData.y + snakeData.h < innerHeight &&
        snakeData.x > 0 && snakeData.y > 0 && !checkTailHit()) {
            snake.style.left = snakeData.x+'px'
            snake.style.top = snakeData.y+'px'
        } else {
            game = 'over'
            direction = undefined
            if (!checkTailHit()){
                if (snakeData.x <= 0) {
                    snake.style.left = '0px'
                } else if (snakeData.x + snakeData.w >= innerWidth){
                    snake.style.left = innerWidth-snakeData.w+'px'
                }
                if (snakeData.y <= 0) {
                    snake.style.top = '0px'
                } else if (snakeData.y + snakeData.h >= innerHeight){
                    snake.style.top = innerHeight-snakeData.h+'px'
                }
            }
        }
        if (snakeData.x+snakeData.w > apple.x && snakeData.y+snakeData.h > apple.y && 
            snakeData.y < apple.y+apple.h && snakeData.x < apple.x+apple.w) {
            apple.change()
            addTail()
            msg.innerHTML = 'Score: '+tailParts.length
        }
        if (game === 'over') {
            msg.innerHTML = 'Game Over</br>Score: '+tailParts.length
            snake.style.backgroundColor = 'rgba(127.5,127.5,0)'
            if (checkTailHit()){
                tailParts[0].part.style.backgroundColor = 'rgba(127.5,127.5,0)'
            }
            clearInterval(update)
        }
    }
},300)