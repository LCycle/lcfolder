document.body.style.backgroundColor = 'black'
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight
const maxStarsCount = 500
const starSize = 10
const starsSpeed = 30
let starsArr = []
let game = 'starting'
let frames = 0
class Star {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.alpha = Math.floor(Math.random()*10) / 10
        this.velocity = starsSpeed * this.alpha
    }
    draw() {
        ctx.fillStyle = 'rgba(255,255,255,'+this.alpha+')'
        ctx.fillRect(this.x, this.y, starSize, starSize)
        this.y += this.velocity
        if (this.y > canvas.height) {
            this.y = -starSize
            this.x = Math.floor(Math.random()*(innerWidth/starSize*2)) * starSize
        }
    }
}
for (let i = 0; i < maxStarsCount; i++) {
    let star = new Star(
        Math.floor(Math.random()*(innerWidth/starSize*2)) * starSize,
        Math.floor(Math.random()*innerHeight-30)
    )
    star.draw()
    starsArr.push(star)
}