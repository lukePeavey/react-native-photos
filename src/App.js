import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 24}}>Welcome</Text>
        <Text style={{fontSize: 14}}>To React Native Photos</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})