import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { View, StatusBar } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'
import DecksView from './components/DecksView'
import Deck from './components/Deck'
import NewCard from './components/Card'
import AddDecks from './components/AddDeck'
import Quiz from './components/Quiz'
import configureStore from './store/Store'
import { setLocalNotification} from "./utils/notifications";


function CardsStatusBar ({ backgroundColor, ...props }) {
    return (
        <View style={{backgroundColor, height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
        </View>
    )

}

const Tabs = TabNavigator({
        Decks: {
            screen: DecksView,
            navigationOptions: {
                tabBarLabel: 'Decks',
                tabBarIcon: ({ tintColor }) => <Ionicons name='ios-albums-outline' size={40} color={tintColor} />
            },
        },
        AddDeck: {
            screen: AddDecks,
            navigationOptions: {
                tabBarLabel: 'Add a Deck',
                tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={35} color={tintColor} />
            },
        },
    },
    {
        navigationOptions: {
            header: null
        },
        tabBarOptions: {
            activeTintColor: '#fff',
            style: {
                height: 70,
                backgroundColor: '#363636',
                justifyContent: 'center',
                alignItems: 'center',
            }
        }
    })

const MainNavigator = StackNavigator({
    Home: {
        screen: Tabs,
    },
    EntryDetail: {
        screen: DecksView,
        navigationOptions: {
            headerTintColor: 'black',
            headerStyle: {
                backgroundColor: 'white',

            }
        }
    },
    Deck: {
        screen: Deck,
        navigationOptions: ({ navigation }) => ({
            title: navigation.state.params.deckName
        })
    },
    Card: {
        screen: NewCard,
        navigationOptions: {
            title: 'New Card'
        }
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: ({ navigation }) => ({
            title: 'Quiz'
        })
    }
})

const store = configureStore()
export default class App extends React.Component {

    componentDidMount(){
        setLocalNotification()
    }

    render() {
        return (
            <Provider store={store}>
                <View style={{flex: 1}}>
                    <CardsStatusBar backgroundColor='#363636' barStyle='light-content'/>
                    <MainNavigator />
                </View>
            </Provider>
        )
    }
}