const words = [
    'bosta',
    'piano',
    'audio',
    'baile',
    'corda',
    'cesta',
    'rumor',
    'traco',
    'humor',
    'braco',
    'morta'
]
const word = words[Math.floor(Math.random() * words.length)]
const letters = 'abcdefghijklmnopqrstuvwxyz'
let game = 'onRound'
let txts = []
let index = 0
let tries = 0
document.addEventListener('keydown', ({ key }) => {
    key = key.toLowerCase()
    if (game == 'onRound') {
        if (letters.includes(key) && index <= 4) {
                txts[index].innerHTML = key
                index++
        } else if (key == 'enter') {
            reload()
        } else if (key == 'backspace') {
            if (tries !== 6) {
                if (index > 0) { index-- }
                txts[index].innerHTML = ''
            }
        }
    }
})
function checkChars() {
    let wordCopy = [...word]
    let rights = 0
    for (let rolls = 1; rolls <= 2; rolls++) {
        for (let i in txts) {
            let txt = txts[i]
            if (wordCopy.includes(txt.innerHTML)) {
                if (rolls == 1) {
                    if (txt.innerHTML == word[i]) {
                        txt.style.color = 'lime'
                        wordCopy.splice(wordCopy.indexOf(txt.innerHTML), 1)
                        rights++
                    }
                } else {
                    txt.style.color = 'yellow'
                    wordCopy.splice(wordCopy.indexOf(txt.innerHTML), 1)
                }
            }
        }
    }
    if (rights == 5) {
        game = 'won'
        console.log('Você venceu!')
        alert('Voce venceu!')
    }
}
function loadNextLine() {
    for (let i = 0; i < 5; i++) {
        let h1 = document.createElement('h1')
        document.body.appendChild(h1)
        h1.style.position = 'absolute'
        h1.style.fontFamily = 'Arial'
        h1.style.left = (innerWidth/2 - 75) + 25 * i + 'px'
        h1.style.top = tries * 50 + 'px'
        txts.push(h1)
    }
}
function reload() {
    if (tries < 6 && index == 5) {
        checkChars()
        txts = []
        tries++
        loadNextLine()
        index = 0
        if (tries == 6 || game !== 'onRound') {
            console.log(`A palavra é: ${word}`)
            if (game == 'onRound') {
                console.log('Você perdeu')
	alert('Voce perdeu')
                game = 'lost'
            }
        }
    }
}
loadNextLine()