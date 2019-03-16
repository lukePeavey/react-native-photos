import React from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import PropTypes from 'prop-types'
import PhotoGridItem from './PhotoGridItem'
import { PhotoPropType, ScreenPropType } from '../../types'
import * as Constants from '../../constants'

/**
|--------------------------------------------------
| Constants
|--------------------------------------------------
*/
const SPACING = Constants.IS_TABLET ? 6 : 2
const ASPECT_RATIO = 1
const RESIZE_MODE = Constants.IS_TABLET ? 'contain' : 'cover'

/**
|--------------------------------------------------
| Prop Types
|--------------------------------------------------
*/
const propTypes = {
  /** Layout of parent component */
  layout: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
  /** Screen  dimensions */
  screen: ScreenPropType,
  /** Array of image collections */
  photos: PropTypes.arrayOf(PhotoPropType).isRequired,
  /**
   * Callback function to be executed when an item is pressed
   * `(event: SyntheticEvent, {item: Object, index: number}) => void`
   */
  onPressItem: PropTypes.func,
}

const defaultProps = {
  spacing: 2,
}

/**
 * PhotoGrid
 * ----------------
 * Displays a collection of photos in a grid of small
 * thumbnail images. This is used on the "Photos" screen as well as the
 * Album screen.
 */
export default class PhotoGrid extends React.Component {
  // The number of grid columns
  get _columns() {
    const { screen } = this.props
    if (Constants.IS_TABLET) {
      return screen.isLandscape ? 7 : 5
    }
    return screen.isLandscape ? 6 : 4
  }

  /** The width height of each image */
  get _imageSize() {
    const { layout } = this.props
    const width = (layout.width - SPACING * this._columns) / this._columns
    const height = width * ASPECT_RATIO
    return { width, height }
  }

  /** Returns a handler function for the given item */
  _onPressItem = (item, index) => event => {
    if (this.props.onPressItem) {
      this.props.onPressItem(event, { item, index })
    }
  }

  render() {
    const { photos } = this.props
    return (
      <View style={styles.grid}>
        {photos.map((item, index) => (
          <PhotoGridItem
            key={item.id}
            item={item}
            onPress={this._onPressItem(item, index)}
            size={this._imageSize}
            style={styles.item}
            resizeMode={RESIZE_MODE}
          />
        ))}
      </View>
    )
  }
}

/**
|--------------------------------------------------
| Styles
|--------------------------------------------------
*/
const styles = StyleSheet.create({
  grid: {
    position: 'relative',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    margin: SPACING / 2,
    backgroundColor: Constants.IS_TABLET ? 'transparent' : '#eee',
  },
})

PhotoGrid.propTypes = propTypes
PhotoGrid.defaultProps = defaultProps
