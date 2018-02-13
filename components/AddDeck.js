import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { addNewDeck } from "../actions";

class AddDeck extends Component {

    state = {
       text: ''
    }

    //From UdaciFitness code
    toHome = () => {
        this.props.navigation.dispatch(NavigationActions.back({
            key: 'AddDeck'
        }))
    }

    submit () {
        this.props.createDeck(this.state.text)
        this.toHome()
    }

    render () {

        return (
            <View style={styles.container}>
                <Text style={styles.text}>What is the title of your new Deck?</Text>
                <TextInput
                    style={styles.textInput}
                    value={this.state.title}
                    onChangeText={input => this.setState({ text: input })}
                />
                <TouchableOpacity style={styles.button} onPress={() => this.submit()}>
                    <Text style={styles.buttonText}>SUBMIT</Text>
                </TouchableOpacity>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    text :{
        fontSize: 25
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    textInput: {
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#000',
        padding: 2,
        margin: 5,
        width: 250,
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
    buttonText: {
        color: '#fff',
        fontSize: 20
    }
})

const mapDispatchToProps = (dispatch) => {
    return {
        createDeck: (title) => dispatch(addNewDeck(title))
    }
}

export default connect(null, mapDispatchToProps)(AddDeck)

