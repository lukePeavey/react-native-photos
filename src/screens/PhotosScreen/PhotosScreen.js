/* eslint-disable no-unused-vars */
import React from 'react'
import { View, Image, Platform, Text, StyleSheet } from 'react-native'
import { ScrollView } from 'react-navigation'
import PropTypes from 'prop-types'
import { ScreenPropType } from '../../types'

const SPACING = 8
const ASPECT_RATIO = 1
const RESIZE_MODE = Platform.isPad ? 'contain' : 'cover'
const IS_TABLET = Platform.OS === 'ios' && Platform.isPad

const propTypes = {
  /** Screen dimensions */
  screen: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    isLandscape: PropTypes.bool.isRequired,
  }).isRequired,
  /** Array of image collections */
  collections: PropTypes.arrayOf(
    PropTypes.shape({
      location: PropTypes.string,
      date: PropTypes.string,
      id: PropTypes.string,
      photos: PropTypes.array,
    })
  ),
}

/**
 * This screen displays the photos in the user's camera roll.
 *
 * Photos are displayed as a grid of small thumbnail images, and grouped
 * into sections called collections.
 */
export default class PhotoScreen extends React.Component {
  static propTypes = propTypes

  /** The number of columns in the image grid */
  get columns() {
    const { screen } = this.props
    if (IS_TABLET) {
      return screen.isLandscape ? 7 : 5
    }
    return screen.isLandscape ? 7 : 4
  }

  /** The width height of each image */
  get imageSize() {
    const { screen } = this.props
    const width = (screen.width - SPACING) / this.columns

    return { width, height: width * ASPECT_RATIO }
  }

  /** Renders the header for each image collection */
  _renderSectionHeader = (section, index) => {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.title}>{section.location}</Text>
        <Text style={styles.subTitle}>{section.date}</Text>
      </View>
    )
  }

  /** Renders an individual item */
  _renderItem = (item, index) => {
    return (
      <View style={[styles.item, this.imageSize]} key={item.id}>
        <Image
          source={{ uri: `${item.bucket}/${item.id}--200.jpg` }}
          style={styles.image}
          resizeMode={RESIZE_MODE}
        />
      </View>
    )
  }

  render() {
    const { collections } = this.props
    return (
      <ScrollView style={styles.container}>
        {collections.map((collection, index) => (
          <View style={styles.grid} key={collection.id}>
            {this._renderSectionHeader(collection, index)}
            {collection.images.map(this._renderItem)}
          </View>
        ))}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING / 2,
  },
  grid: {
    position: 'relative',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    padding: SPACING / 2,
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: '#eee',
  },
  sectionHeader: {
    minWidth: '100%',
    marginHorizontal: SPACING / 2,
    marginTop: 20,
    marginBottom: SPACING,
  },
  title: {
    fontSize: 18,
    lineHeight: 27,
    fontWeight: '500',
  },
  subTitle: {
    fontSize: 14,
  },
})
