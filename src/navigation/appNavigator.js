import React from 'react'
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
} from 'react-navigation'
import { Platform } from 'react-native'
import PhotosScreen from '@screens/PhotosScreen'
import AlbumsScreen from '@screens/AlbumsScreen'
import SingleAlbumScreen from '@screens/SingleAlbumScreen'
import InfoScreen from '@screens/InfoScreen'
import SlideShowScreen from '@screens/SlideShowScreen'
import TabBarIcon from '@views/TabBarIcon'

// App Navigation:
// - A bottom tab bar provides navigation to the apps top-level screens:
//   Photos, Albums, Info (this one is just temporary).
// - Each tab is a separate stack navigator with one or more screens.

const navigationOptions = {
  headerTransitionPreset: 'uikit',
  headerMode: 'float',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: 'rgba(249, 249, 249, 0.9)',
    },
  },
}

/**
|--------------------------------------------------
| Top-level Screens
|--------------------------------------------------
*/
const PhotosStack = createStackNavigator(
  {
    Photos: { screen: PhotosScreen },
  },
  navigationOptions
)

const AlbumsStack = createStackNavigator(
  {
    Albums: { screen: AlbumsScreen },
    SingleAlbum: { screen: SingleAlbumScreen },
  },
  navigationOptions
)

const InfoStack = createStackNavigator(
  {
    Info: { screen: InfoScreen },
  },
  navigationOptions
)

/**
|--------------------------------------------------
| Tab Navigator
|--------------------------------------------------
*/
const TabNavigator = createBottomTabNavigator({
  Photos: {
    screen: PhotosStack,
    navigationOptions: {
      tabBarLabel: 'Photos',
      tabBarIcon: props => <TabBarIcon name="ios-photos" {...props} />,
    },
  },
  Albums: {
    screen: AlbumsStack,
    navigationOptions: {
      tabBarLabel: 'Albums',
      tabBarIcon: props => <TabBarIcon name="ios-albums" {...props} />,
    },
  },
  Info: {
    screen: InfoStack,
    navigationOptions: {
      tabBarLabel: 'Info',
      tabBarIcon: props => (
        <TabBarIcon name="ios-information-circle-outline" {...props} />
      ),
    },
  },
})

TabNavigator.navigationOptions = {
  header: null,
  tabBarOptions: {
    activeTintColor: '#6200ee',
    inactiveTintColor: '#999',
  },
}

/**
|--------------------------------------------------
| Root Navigator
|--------------------------------------------------
*/

const AppNavigator = createStackNavigator(
  {
    TabNavigator,
    SlideShow: {
      screen: SlideShowScreen,
      navigationOptions: {
        tabBarVisible: false,
        headerTransparent: true,
      },
    },
  },
  navigationOptions
)

export default createAppContainer(AppNavigator)
