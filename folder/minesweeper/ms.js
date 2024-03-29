const gridSide = 860
const totalBombs = 12
const buttonSide = gridSide/10
let bombNumbersArray = []
let buttonsArray = []
let game = 'inGame'

let gameOverText = document.createElement('h1')
gameOverText.style.top = gridSide/4+'px'
gameOverText.style.left = 3*gridSide/4+'px'
gameOverText.style.fontSize = '96px'
let infos = document.createElement('h1')
let time = 0
infos.innerHTML = `Time: ${time}</br>Bombs: ${totalBombs}</br></br>Ctrl+click to </br> mark the bombs.`

while (bombNumbersArray.length != totalBombs) {
    let number = Math.floor(Math.random()*100)
    if (!bombNumbersArray.includes(number)){
        bombNumbersArray.push(number)
    }
} // escolhendo quais são bombas

for (let filera = 0; filera < 10; filera++) {
    for (let coluna = 0; coluna < 10; coluna++) {
        let button = document.createElement('button')
        let bombStts = false
        document.body.appendChild(button)
        button.style.height = button.style.width = buttonSide
        button.style.left = coluna*buttonSide+gridSide/2+'px'
        button.style.top = filera*buttonSide+'px'
        button.style.backgroundColor = 'cyan'
        let index = filera*10+coluna
        if (bombNumbersArray.includes(index)) {
            bombStts = true
        }
        let objButton = {
            button: button,
            bombStts: bombStts,
            clicked: false,
            index: index,
            f: filera,
            c: coluna
        }
        bttnListener(objButton)
        buttonsArray.push(objButton)
    }
} // montando os botões

document.body.appendChild(gameOverText)
document.body.appendChild(infos)

function areaCheck(button) {
    let areaButtonsArray = []
    let bombsAround = 0
    let filera = button.f
    let coluna = button.c
    for (let fR = -1; fR <= 1; fR++) {
        for (let cR = -1; cR <= 1; cR++) {
            let col = coluna+cR
            let fil = filera+fR
            let i = fil*10+col
            if (col > -1 && col < 10) {
                if (fil > -1 && fil < 10) {
                    for (let bttn of buttonsArray) {
                        if (bttn.index == i && bttn.index != button.index) {
                            if (bttn.bombStts === true) {
                                bombsAround++
                            } else if (!bttn.clicked) {
                                areaButtonsArray.push(bttn)
                            }
                        }
                    }
                }
            }
        }
    }
    if (bombsAround == 0) {
        for (let bttn of areaButtonsArray) {
            bttn.clicked = true
            areaCheck(bttn)
        }
    } else {
        button.button.innerHTML = bombsAround
    }
    button.button.style.backgroundColor = 'grey'
}

let updtTime
let bombsMarked = 0
function bttnListener(objButton) {
    objButton.button.addEventListener('click', (e) => {
        if (game == 'inGame') {
            let actualColor = objButton.button.style.backgroundColor
            if (e.ctrlKey == true) {
                if (actualColor == "cyan") {
                    if (bombsMarked != totalBombs) {
                        bombsMarked++
                        objButton.button.style.backgroundColor = 'lime'
                    }
                } else if (actualColor == 'lime') {
                    objButton.button.style.backgroundColor = 'cyan'
                    if (bombsMarked != 0) {bombsMarked--}
                }
                infos.innerHTML = `Time: ${time}</br>Bombs: ${totalBombs-bombsMarked}</br></br>Ctrl+click to </br> mark the bombs.`
                if (!updtTime) updtTime = setInterval(() => {
                    if (game == 'inGame') {
                        time++
                        infos.innerHTML = `Time: ${time}</br>Bombs: ${totalBombs-bombsMarked}</br></br>Ctrl+click to </br> mark the bombs.`
                    }
                }, 1000)
                return
            } else if (actualColor == 'lime') return
            objButton.clicked = true
            if (objButton.bombStts == true) {
                for (let bttn of buttonsArray) {
                    if (bttn.bombStts) bttn.button.style.backgroundColor = 'red'
                }
                game = 'GameOver'
                gameOverText.innerHTML = 'Game Over'
            } else {
                areaCheck(objButton)
                if (!updtTime) updtTime = setInterval(() => {
                    if (game == 'inGame') {
                        time++
                        infos.innerHTML = `Time: ${time}</br>Bombs: ${totalBombs-bombsMarked}</br></br>Ctrl+click to </br> mark the bombs.`
                    }
                }, 1000)
                for (let bttn of buttonsArray) {
                    if (!bttn.clicked && !bttn.bombStts) return
                }
                game = 'victory'
                gameOverText.innerHTML = 'You Win!'
                for (let bttn of buttonsArray) {
                    if (bttn.bombStts) bttn.button.style.backgroundColor = 'lime'
                }
            }
            infos.innerHTML = `Time: ${time}</br>Bombs: 0</br></br>Ctrl+click to </br> mark the bombs. </br></br>Refresh to play </br>again.`
        }
    })
}