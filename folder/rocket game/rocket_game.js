const txt = document.createElement('h1')
document.body.appendChild(txt)
txt.style.top = innerHeight/2-70
txt.style.left = innerWidth/2-300
txt.innerHTML = 'Press a key to start'
let score = 0
let pressedKey = false
let lasersArray = []

const playerImg = document.getElementById('player')
const imgSize = canvas.width/20
const playerStep = imgSize/3
const midle = innerWidth/2-imgSize/2
const keyCodes = [87,65,83,68,82] // w,a,s,d,R
const shootTotal = 15
let x = midle
let y = innerHeight/2+50

playerImg.style.position = 'absolute'
playerImg.style.left = x
playerImg.style.top = y
playerImg.style.width = playerImg.style.height = imgSize
let enimiesArr = []
let shootsCount = shootTotal

class Laser {
    constructor() {
        this.width = imgSize/10
        this.height = imgSize
        this.on = true
        this.x = x+2*imgSize/5
        this.y = y-this.height
        this.vel = this.height/2
    }
    draw() {
        ctx.fillStyle = 'white'
        ctx.fillRect(this.x, this.y, this.width, this.height)
        this.y -= this.vel
        for (let enimy of enimiesArr) {
            checkHit(this, enimy)
        }
    }
}

function reloadTxt () {
    txt.innerHTML = 'Score: '+score+'</br>Press R to shoot</br></br>Lasers: '+shootsCount
    if (shootsCount == 0) {
        txt.innerHTML = 'Score: '+score+'</br>You ran out of lasers!</br>Press R to recharge</br></br>Lasers: '+shootsCount
    }
}

document.addEventListener('keydown', ({keyCode})=>{
    if (game == 'starting') {
        reloadTxt()
        txt.style.left = txt.style.top = 0
        if (pressedKey == false) {
            loadEnimies()
            pressedKey = true
        }
    } else if (game == 'running' && keyCodes.includes(keyCode)) {
        switch (keyCode) {
            case 87:
                if (y > canvas.height/2) y -= playerStep
                break
            case 65:
                if (x > 0) {x -= playerStep} else {x = 0}
                break
            case 83:
                if (y+imgSize < canvas.height) {y += playerStep} else {y = canvas.height-imgSize}
                break
            case 68:
                if (x+imgSize < canvas.width) {x += playerStep} else {x = canvas.width-imgSize}
                break
            case 82:
                shootLaser()
        }
        playerImg.style.left = x+'px'
        playerImg.style.top = y+'px'
    }
})

function shootLaser () {
    if (shootsCount != 0) {
        shootsCount--
        let laser = new Laser()
        lasersArray.push(laser)
    } else {
        shootsCount = shootTotal
        lasersArray.splice(0, lasersArray.length)
        score -= 30
        if (score < 0) score = 0
    }
    reloadTxt()
}

function checkHit(laser, enimy) {
    let enimyX = Number(enimy.img.style.left.replace('px',''))
    let enimyY = Number(enimy.img.style.top.replace('px',''))
    if (laser.x <= enimyX+imgSize && laser.y <= enimyY+imgSize && laser.x+laser.width > enimyX
        && enimy.lifes != 0 && laser.on
        ) {
        enimy.lifes--
        laser.on = false
        if (enimy.lifes == 0) {
            enimy.img.src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
            score += 10
            reloadTxt()
            for (let enimy of enimiesArr) {
                if (enimy.lifes != 0) return
            }
            txt.innerHTML = 'You win!</br> Score: '+score
            game = 'over'
            let victoryAnim = setInterval(() => {
                playerImg.style.top = Number(playerImg.style.top.replace('px',''))-imgSize/5
            }, 50)
            setTimeout(() => {clearInterval(victoryAnim)}, 3000)
        }
    }
}

function loadEnimies() {
    for (let i = 0; i < 9; i++) {
        let enimy = document.createElement('img')
        document.body.appendChild(enimy)
        enimy.src = 'https://i.pinimg.com/originals/81/da/d0/81dad0cd45c6bfa10994b6035c4cf175.png'
        enimy.style.position = 'absolute'
        enimy.style.transform = 'rotate(180deg)'
        enimy.style.width = enimy.style.height = imgSize
        switch (i) {
            case 0:
                enimy.style.top = -imgSize
                enimy.style.left = midle
                break
            case 1:
                enimy.style.top = -imgSize*2
                enimy.style.left = midle-imgSize
                break
            case 2:
                enimy.style.top = -imgSize*2
                enimy.style.left = midle
                break
            case 3:
                enimy.style.left = midle+imgSize
                enimy.style.top = -imgSize*2
                break
            case 4:
                enimy.style.left = midle-imgSize*2
                enimy.style.top = -imgSize*3
                break
            case 5:
                enimy.style.left = midle-imgSize
                enimy.style.top = -imgSize*3
                break
            case 6:
                enimy.style.left = midle
                enimy.style.top = -imgSize*3
                break
            case 7:
                enimy.style.left = midle+imgSize
                enimy.style.top = -imgSize*3
                break
            case 8:
                enimy.style.left = midle+imgSize*2
                enimy.style.top = -imgSize*3
        }
        enimiesArr.push({img: enimy, lifes: 3})
        animateEnimy(enimy)
    }
}

function animateEnimy(enimy) {
    let animationTotalFrames = 100
    let enimyAnimationDuration = 3000 // em milissegundos
    let yOffSet = innerHeight/2-imgSize
    let animation = setInterval(() => {
        enimy.style.top = Number(enimy.style.top.replace('px',''))+yOffSet/animationTotalFrames
    }, enimyAnimationDuration/animationTotalFrames);
    setTimeout(() => {
        clearInterval(animation)
        game = 'running'
    },enimyAnimationDuration)
    let floatingAnmtn = setInterval(() => {
        let animUp = setInterval(() => {
            enimy.style.top = Number(enimy.style.top.replace('px',''))-(imgSize/animationTotalFrames)
        }, enimyAnimationDuration/animationTotalFrames);
        setTimeout(() => {
            clearInterval(animUp)
            let animDonw = setInterval(() => {
                enimy.style.top = Number(enimy.style.top.replace('px',''))+(imgSize/animationTotalFrames)
            }, enimyAnimationDuration/animationTotalFrames)
            setTimeout(() => {clearInterval(animDonw)}, enimyAnimationDuration/2)
        }, enimyAnimationDuration/2)
    }, enimyAnimationDuration);
}
const update = () => {
    if (frames % 2 == 0) {
        ctx.clearRect(0,0, innerWidth, innerHeight)
        for (let star of starsArr) {
            star.draw()
        }
        for (let laser of lasersArray) {
            if (game == 'running' && laser.on) {
                laser.draw()
            }
        }
    }
    requestAnimationFrame(update)
    frames++
    if (frames == 10) {frames = 0}
}
update()