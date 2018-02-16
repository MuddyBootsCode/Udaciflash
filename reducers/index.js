import { ADD_CARD, ADD_DECK, GET_ALL_DECKS} from "../actions";

function decks(state = {},action) {
    let deck = null
}

function decks (state = {}, action) {
    switch(action.type) {
        case ADD_DECK :
            return {
                ...state,
                [action.deck.title]: action.deck
            }
        case ADD_CARD :
            const { deckName, question } = action

            deck = state[deckName]
            const questions = deck.questions.concat(question)

            return {
                ...state,
                [deckName]: { ...deck, questions }
            }
        case GET_ALL_DECKS :
            return {
                ...state,
                ...action.decks
            }
        default:
            return state;

    }
}

export default decks