/* eslint-disable no-unused-vars */
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

const propTypes = {}
const defaultProps = {}

/**
 * This screen displays the photos in the user's camera roll.
 *
 * Photos are displayed as a grid of small thumbnail images, and grouped
 * into sections called collections.
 */
export default class MyPhotos extends React.Component {
  state = {}

  render() {
    return (
      <View style={styles.container}>
        <Text>Photos Screen</Text>
        <Text>This is a placeholder for the Photos screen</Text>
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
