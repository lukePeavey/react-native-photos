import React from 'react'
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native'
import PropTypes from 'prop-types'
import PhotoGrid from '@views/PhotoGrid'
import * as Constants from '../../constants'
import { PhotoPropType, ScreenPropType, NavigationPropType } from '../../types'

/**
|--------------------------------------------------
| Prop Types
|--------------------------------------------------
*/
const propTypes = {
  /** React navigation prop */
  navigation: NavigationPropType.isRequired,
  /** Screen dimensions */
  screen: ScreenPropType.isRequired,
  /** Array of image collections */
  photos: PropTypes.arrayOf(PhotoPropType).isRequired,
}

/**
 * Photos Screen
 * -------------
 * This screen displays the photos in the user's camera roll.
 *
 * Photos are displayed as a grid of small thumbnail images, and grouped
 * into sections called collections.
 */
export default class PhotosScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Photos',
  })

  state = { layout: null }

  _onLayout = ({ nativeEvent }) => {
    this.setState({ layout: nativeEvent.layout })
  }

  _handlePressImage = (event, { item, index }) => {
    const { navigation } = this.props
    navigation.navigate('SlideShow', {
      initialIndex: index,
      image: item,
    })
  }

  render() {
    const { photos, screen } = this.props
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.grid}
        onLayout={this._onLayout}
      >
        {this.state.layout && (
          <PhotoGrid
            photos={photos}
            onPressItem={this._handlePressImage}
            layout={this.state.layout}
            screen={screen}
          />
        )}
      </ScrollView>
    )
  }
}

/**
|--------------------------------------------------
| Styles
|--------------------------------------------------
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: Constants.IS_TABLET ? 16 : 2,
  },
})

PhotosScreen.propTypes = propTypes
