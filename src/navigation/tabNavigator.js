import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import PhotosScreen from '@screens/PhotosScreen'
import AlbumsScreen from '@screens/AlbumsScreen'
import InfoScreen from '@screens/InfoScreen'

const TabNavigator = createBottomTabNavigator(
  {
    Photos: {
      screen: PhotosScreen,
      navigationOptions: {
        tabBarLabel: 'Photos',
        tabBarIcon: props => <TabBarIcon name="ios-photos" {...props} />,
      },
    },
    Albums: {
      screen: AlbumsScreen,
      navigationOptions: {
        tabBarLabel: 'Albums',
        tabBarIcon: props => <TabBarIcon name="ios-albums" {...props} />,
      },
    },
    Info: {
      screen: InfoScreen,
      navigationOptions: {
        tabBarIcon: props => (
          <TabBarIcon name="ios-information-circle-outline" {...props} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#6200ee',
      inactiveTintColor: '#999',
    },
  }
)

const TabBarIcon = ({ name, tintColor }) => (
  <Ionicons name={name} size={25} color={tintColor} />
)

export default createAppContainer(TabNavigator)
