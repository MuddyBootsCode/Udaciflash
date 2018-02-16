import React, { Component } from 'react'
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

class Quiz extends Component {
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

                    <Button
                        buttonStyle={styles.backButton}
                        onPress={() => navigation.navigate('Deck', { deckName })}
                        title={`Back to ${deckName}`} />
                    <Text/>
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
                <Text style={styles.numbersText}>{cardNumber} / {questions.length}</Text>
                <Text h2>{question}</Text>

                {answerShowing ?
                    <View>
                        <Text h2>{answer}</Text>
                        <Text/>
                        <Text/>
                        <Button
                            buttonStyle={styles.correctButton}
                            onPress={() => this.correct()}
                            title='Correct'
                        />
                        <Text/>
                        <Text/>
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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },

    backButton: {
        backgroundColor: '#ff0000',
        height: 50,
        width: '90%',
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3
        }
    },

    answerButton: {
        backgroundColor: '#ff0000',
        height: 50,
        width: '90%',
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3
        }
    },

    correctButton: {
        backgroundColor: '#15ff28',
        height: 50,
        width: '90%',
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3
        }
    },

    incorrectButton: {
        backgroundColor: '#f00',
        height: 50,
        width: '90%',
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3
        }
    },
    text: {
        fontSize: 25,
        color: '#fff'
    },
    numbersText: {
        fontSize: 25,
    }
})

const mapStateToProps = (state,ownProps) => {
    const { deckName } = ownProps.navigation.state.params
    const questions = state[deckName].questions

    return { questions }
}

export default connect(mapStateToProps)(Quiz)