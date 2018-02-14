import React, { Component } from 'react'
import { StyleSheet, TextInput, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { addCardToDeck } from "../actions";

class NewCard extends Component{

    state = {
        question: '',
        answer: ''
    }

    submit () {
        const card = {
            question: this.state.question,
            answer: this.state.answer
        }
        const { deckName } = this.props.navigation.state.params
        this.props.createCard(deckName, card)
        this.props.navigation.navigate('Deck',{ deckName })
    }

    render () {

        const { question, answer } = this.state

        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <Text style={styles.text}>Question:</Text>
                <TextInput
                    style={styles.textInput}
                    value={question}
                    onChangeText={input => this.setState({ question: input })}
                />
                <Text style={styles.text}>Answer:</Text>
                <TextInput
                    style={styles.textInput}
                    value={answer}
                    onChangeText={input => this.setState({ answer: input })}
                />
                <TouchableOpacity style={styles.button} onPress={() => this.submit()}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#fff'
    },
    textInput: {
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#000',
        padding: 2,
        margin: 5,
        width: '95%',
        height: 30
    },
    button: {
        height: 50,
        width: '90%',
        borderRadius: 3,
        backgroundColor: '#ff0000',
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
        fontSize: 30,
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 25,
        color: '#fff'
    }
})

const mapDispatchToProps = (dispatch) => {
    return {
        createCard: (deckName, card) => dispatch(addCardToDeck(deckName, card))
    }
}

export default connect(() => ({}), mapDispatchToProps)(NewCard)