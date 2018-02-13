import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Text, Button } from 'react-native-elements'
import {
    clearLocalNotification,
    setLocalNotification
} from '../utils/notifications'

const defaultState = {
    cardNumber: 1,
    numCorrect: 0,
    answerShowing: false
}

class Quiz extends React.Component {
    state = Object.assign({},defaultState)

    nextCard() {
        this.setState((prevState) => ({
            cardNumber: prevState.cardNumber + 1,
            answerShowing: false
        }))
    }

    correct() {
        this.setState((prevState) => ({ numCorrect: prevState.numCorrect + 1 }))
        this.nextCard()
    }

    incorrect() {
        this.nextCard()
    }

    reset() {
        this.setState(() => defaultState)
    }

    render() {
        const { navigation, questions } = this.props
        const { deckName } = navigation.state.params
        const { cardNumber, answerShowing } = this.state
        const card = questions[cardNumber - 1]


        if (card === undefined) {
            return (
                <View style={styles.container}>
                    <Text h2>You answered {this.state.numCorrect} question(s) correctly out of {questions.length} total.</Text>

                    <TouchableOpacity
                        buttonStyle={styles.backButton}
                        onPress={() => navigation.navigate('Deck', { deckName })}
                        title={`Back to ${deckName}`} />

                    <Button
                        buttonStyle={styles.backButton}
                        onPress={() => this.reset()}
                        title='Reset Quiz' />
                </View>
            )
        }

        clearLocalNotification().then(setLocalNotification)

        const { question, answer } = card

        return (
            <View style={styles.container}>
                <Text>{cardNumber} / {questions.length}</Text>
                <Text h2>{question}</Text>

                {answerShowing ?
                    <View>
                        <Text h2>{answer}</Text>

                        <Button
                            buttonStyle={styles.correctButton}
                            onPress={() => this.correct()}
                            title='Correct'
                        />

                        <Button
                            buttonStyle={styles.incorrectButton}
                            onPress={() => this.incorrect()}
                            title='Incorrect'
                        />
                    </View>

                    :

                    <Button
                        buttonStyle={styles.answerButton}
                        onPress={() => this.setState(() => ({ answerShowing: true }))}
                        title='Answer' />
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: '#fff'
    },

    backButton: {
        backgroundColor: '#ff0000'
    },

    answerButton: {
        backgroundColor: '#ff0000'
    },

    correctButton: {
        backgroundColor: '#15ff28'
    },

    incorrectButton: {
        backgroundColor: '#f00'
    },
    text: {
        fontSize: 25,
        color: '#fff'
    }
})

const mapStateToProps = (state,ownProps) => {
    const { deckName } = ownProps.navigation.state.params
    const questions = state[deckName].questions

    return { questions }
}

export default connect(mapStateToProps)(Quiz)