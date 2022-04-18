export enum Status {
    Run,
    Won,
    Lost
}

export enum Move {
    Tyranu,
    Evavu
}

export const faces = ['clubs', 'diamonds', 'hearts', 'spades'] as const
type Face = typeof faces[number]
type Value = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14

export type Card = {
    face: Face,
    value: Value
}

export type State = {
    deck: Card[],
    open: Card,
    move: number // first move is 1
    status: Status
    lastGuess: Move | null,
}

function newDeck() {
    const cards : Card[] = []
    for (let value=2; value<=14; value++) {
        for (let face of faces) {
            cards.push({face, value: value as Value})
        }
    }
    return cards
}

function shuffle<T>(arr: T[]) : void {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }    
}

function newState() : State {
    const deck = newDeck()
    shuffle(deck)
    const open = deck.pop()!
    const move = 1
    const status = Status.Run
    const lastGuess = null
    return {
        open,
        deck,
        move,
        status,
        lastGuess
    }
}

export function correctGuesses(state: State) : number {
    return state.move - 1
}

type StateChange = (state: State) => State

function nextMove(state: State) : State {
    return {
        ...state,
        open: state.deck[0],
        deck: state.deck.slice(1),
        move: state.move + 1
    }
}

function win(state: State) : State {
    return { ...state, status: Status.Won }
}


function lose(state: State) : State {
    return { ...state, status: Status.Lost }
}

function compare(one: Card, two: Card) : number {
    if (one.value === two.value) return 0
    if (one.value < two.value) return -1
    if (one.value > two.value) return 1
    return 0
}

function move(state: State, move: Move) : State {
    const wantedMove = compare(state.open, state.deck[0])
    let newState = state
    if (wantedMove === 0 || wantedMove < 0 && move === Move.Tyranu || wantedMove > 0 && move === Move.Evavu) {
        if (state.deck.length === 1) {
            newState = win(state)
        } else {
            newState = nextMove(state)
        }
    } else {
        newState = lose(state)
    }
    return { ...newState, lastGuess: move }
}

export {
    newState,
    move
}