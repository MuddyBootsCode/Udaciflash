import { AsyncStorage } from 'react-native'

export const DECK_STORAGE_KEY = 'Udacicards:Decks'

const startDecks = {
    React: {
        title: 'Udacity',
        card: [
            {
                question: 'What is Udacity?',
                answer: 'A fun place to learn things!'
            },
            {
                question: 'What class are you taking from Udacity?',
                answer: 'React!!!!!'
            }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
        card: [
            {
                question: 'What is your favorite Javascript quote?',
                answer: 'Anything that can be written in Javascript will be!.'
            }
        ]
    }
}

function setStartingDecks() {
    AsyncStorage.setItem(DECK_STORAGE_KEY,JSON.stringify(startDecks))
    return startDecks
}


function formatDecks(results) {
    return results === null ? setStartingDecks() : JSON.parse(results)
}

export function fetchDecks() {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then(formatDecks)
}

export function createCardDeck (newDeck) {
    return fetchDecks()
        .then((decks) => {
            console.log(decks)
            decks[newDeck.title] = newDeck
            return AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks))
        })
}

export function createDeckCard (deckName, question){
    return fetchDecks()
        .then((decks) => {
            decks[deckName].questions.push(question)
            return AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks))
        })
}

