import * as game from './game'

if (window.location.pathname === "/gameroom/") {
    document.querySelector("#center").insertAdjacentHTML("beforeend", `<center><a href="/gameroom/?game=tyranuevavu">Tyranu Evavu</a></center>`)
}

function ordinal(n: number) {
    function suffix() {
        if (n < 10 || n > 20) {
            if (n%10 === 1) return "st"
            if (n%10 === 2) return "nd"
            if (n%10 === 3) return "rd"
        }
        return "th"
    }
    return n + suffix()
}

const montage = "https://i.ibb.co/dLkT8hx/montage.gif"
const imageBack = "https://i.ibb.co/NL9khyL/back1.gif"
const imageHost = "https://i.ibb.co/5GM88gN/uga-jubjub.gif"
const imageTyranu = "https://i.ibb.co/BBgTnk7/tyranu.gif"
const imageEvavu = "https://i.ibb.co/T4QnGjp/evavu.gif"


const imageWidth = 70

function xOffset(card: game.Card) {
    const a = card.value - 2
    const b = game.faces.indexOf(card.face)
    return (a * 4 + b) * imageWidth
}

function Game() {
    let state;

    const root = document.createElement("div")
    const cards =document.createElement("div")
    const img = document.createElement('img')
    const move = document.createElement("p")
    const scream = document.createElement("p")
    const imgHost = document.createElement('img')
    const imgClosed = document.createElement("img")
    const summary = document.createElement("div")
    const summaryText = document.createElement("p")
    const buttons = document.createElement("fieldset")
    const again = document.createElement("button")

    cards.appendChild(img)
    cards.appendChild(imgClosed)
    summary.appendChild(summaryText)
    summary.appendChild(again)
    
    
    root.id = "tyranu-evavu"
    root.dataset.status = "run"
    imgHost.src = imageHost
    scream.innerText = "Uhhg Uuuuuuhhhhgggg!"
    again.innerText = "Try again"
    
    scream.classList.add("scream")
    summary.classList.add("summary")
    move.classList.add('move')
    cards.classList.add('cards')
    
    function hideImage() {
        imgClosed.src = imageBack
        imgClosed.style.objectPosition = "initial"
    }

    function setImage(card : game.Card, img: HTMLImageElement) {
        img.width = imageWidth
        img.height = 90
        img.src = montage
        img.style.objectPosition = `-${xOffset(card)}px 0`
        img.style.objectFit = "none"    
    }

    function setMove(state: game.State, p: HTMLParagraphElement) {
        p.innerHTML = `Graguda Tyranu Evavu! Gedd lacka.
        Ugavu drecka <b>${ordinal(state.move)}</b> ga`       
    }

    function setState(value: game.State) {
        state = value
        setImage(value.open, img)
        setMove(value, move)
    }

    function gameOver() {
        root.dataset.status = "lost"
        const lastGuess = state.lastGuess === game.Move.Evavu ? "Evavu" : "Tyranu"
        const correct = lastGuess === "Evavu" ? "Tyranu" : "Evavu"
        summaryText.innerHTML = `You guessed ${lastGuess}. The correct answer was ${correct}.
        You managed <b>${game.correctGuesses(state)}</b> correct guesses...
        That's worth <b>0 np</b>!`
        setImage(state.deck[0], imgClosed)
    }

    function newGame() {
        root.dataset.status = "run"
        hideImage()
        setState(game.newState())
    }

    const moves = ["tyranu", "evavu"]
    for (let m of moves) {
        const button = document.createElement("input")
        button.type = "image"
        button.src = m === "evavu" ? imageEvavu : imageTyranu
        button.value = m
        buttons.appendChild(button)
    }

    root.appendChild(imgHost)
    root.appendChild(scream)
    root.appendChild(move)
    root.appendChild(cards)
    root.appendChild(summary)
    root.appendChild(buttons)

    again.addEventListener("click", newGame)

    root.addEventListener("click", (e) => {
        // @ts-ignore
        const value = e.target.value
        if (!value) return
        const action = {
            "evavu" : game.Move.Evavu,
            "tyranu" : game.Move.Tyranu
        }[value]
        if (action == null) return
        const newState = game.move(state, action)
        if (newState.status === game.Status.Lost) {
            gameOver()
        }
        if (newState.status === game.Status.Won) {
            root.innerHTML = ""
            const a = document.createElement("a")
            a.textContent = "YOU WON!!! CLICK TO CLAIM YOUR PRIZE!!!"
            a.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            root.appendChild(a)
        }
        setState(newState)
    })

    newGame()

    return root
}

const style = `[data-status] {
    font-family: sans-serif;
    text-align: center;
    justify-content: center;
}

[data-status] fieldset {
    border: none;
}

[data-status] input {
    display: block;
    margin: 0 auto;
}

[data-status] .cards {
    display: flex;
    justify-content: center;
    column-gap: 8px;
}
[data-status] .cards img {
    border: 1px solid #ddd;
}


[data-status="lost"] fieldset,
[data-status="lost"] .move {
    display: none;
}

[data-status="run"] .scream,
[data-status="run"] .summary {
    display: none;
}

.scream {
    font-size: 36px;
    font-weight: bold;
}
.move,
.summary {
    white-space: pre-line;
}`

if (window.location.href.endsWith("/gameroom/?game=tyranuevavu")) {
    document.body.insertAdjacentHTML("afterend", `<style>${style}</style>`)
    const target = document.querySelector(".content")
    target.parentNode.replaceChild(Game(), target)
}