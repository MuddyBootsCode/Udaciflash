import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { List, Card } from 'react-native-elements'
import { connect } from 'react-redux'
import { fetchAllDecks } from "../actions"
import _ from 'lodash'


class DecksView extends Component{

    componentDidMount () {
        this.props.loadDecks()
    }

    render () {

        const { decks } = this.props
        console.log(decks)
        //maybe add apploading

        return(
            <View style={styles.container}>
                <List>
                    {

                        Object.keys(decks).map((deckName) => {
                                return (
                                    <Card
                                        style={styles.cards}
                                        key={deckName}
                                    >
                                        <TouchableOpacity
                                            style={styles.button}
                                            onPress={() => this.props.navigation.navigate('Deck',{ deckName: deckName })}
                                        >
                                            <Text style={styles.text}>{decks[deckName].title} -
                                            ({decks[deckName].questions.length})
                                            </Text>
                                        </TouchableOpacity>
                                    </Card>
                                )
                        })
                    }

                </List>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    cards: {
      flex: 1
    },
    text: {
      color: '#fff',
      fontSize: 20
    },
    button: {
        height: 50,
        width: '100%',
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
    }
})

const mapStateToProps = (state) => {
    return{
        decks: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadDecks: () => dispatch(fetchAllDecks())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DecksView)