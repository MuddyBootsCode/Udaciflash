import { createCardDeck, createDeckCard, fetchDecks} from "../utils/api";

export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'
export const GET_ALL_DECKS = 'GET_ALL_DECKS'

export function addDeck(deck) {
    return {
        type: ADD_DECK,
        deck
    }
}

export function addCard (deckName, card) {
    return {
        type: ADD_CARD,
        deckName,
        card
    }
}

export function getAllDecks(decks) {
    return {
        type: GET_ALL_DECKS,
        decks
    }
}

export function addNewDeck(title) {
    return (dispatch) => {
        const deck = { title: title, questions: [] }
        console.log(deck)
        createCardDeck(deck).then(() => dispatch(addDeck(deck)))
    }
}

export function addCardToDeck (deckName, card) {
    return dispatch => {
        createDeckCard(deckName, card)
            .then(() => dispatch(addCard(deckName, card)))
    }
}

export function fetchAllDecks () {
    return dispatch => {
        fetchDecks()
            .then((decks) => dispatch(getAllDecks(decks)))
    }
}