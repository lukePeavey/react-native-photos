/* eslint-disable no-unused-vars */
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

const propTypes = {}
const defaultProps = {}

/**
 * This screen displays a list of the user's albums.
 */
export default class MyAlbums extends React.Component {
  state = {}

  render() {
    return (
      <View style={styles.container}>
        <Text>Albums Screen</Text>
        <Text>This is a placeholder for the albums screen.</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
