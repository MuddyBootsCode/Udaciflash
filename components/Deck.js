import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'

class Deck extends React.Component {
    render() {
        const { navigation, deckName, deck = {} } = this.props
        const { title, questions = [] } = deck
        const cardCount = questions.length

        return (
            <View style={styles.container}>
                <Text style={styles.heading}>{title}</Text>

                <Text style={styles.heading}>
                    {cardCount}
                    {cardCount === 1 ? ' card' : ' cards'}
                </Text>
                <Text/>


                    <TouchableOpacity
                        onPress={() => navigation.navigate('Card', { deckName })}
                        style={styles.button}
                    >
                        <Text style={styles.text}>Add a Card</Text>
                    </TouchableOpacity>
                    <Text/>
                    {cardCount > 0 &&

                    <Button
                        buttonStyle={styles.button}
                        onPress={() => navigation.navigate('Quiz', { deckName })}
                        title='Start Quiz'
                        />
                    }

            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttons: {
        alignItems: 'stretch',
        width: '80%'
    },
    heading: {
      fontSize: 40
    },
    text: {
        color: '#fff',
        fontSize: 20
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
        },
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    }
})

const mapStateToProps = (state,ownProps) => {
    const { deckName } = ownProps.navigation.state.params
    const deck = state[deckName]

    return { deckName, deck }
}

export default connect(mapStateToProps)(Deck)