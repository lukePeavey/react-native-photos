/* eslint-disable no-unused-vars */
import React from 'react'
import { StyleSheet, ScrollView, Platform } from 'react-native'
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
  /** Array of images */
  photos: PropTypes.arrayOf(PhotoPropType).isRequired,
  screen: ScreenPropType,
}

/**
 * Single Album Screen
 * ---------------------
 * This screen displays the content of photo album.
 *
 * Photos are displayed as a grid of small thumbnail images. The user can
 * press an image to open the full-screen photo slider.
 *
 * TODO:
 * The image grid on this screen is pretty much identical to the one on
 * the photos screen. It should be extracted into a separate component
 * that can be shared by both screens.
 */
export default class SingleAlbum extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('albumName'),
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
        contentContainerStyle={styles.contentContainer}
        onLayout={this._onLayout}
        showsVerticalScrollIndicator={false}
      >
        {this.state.layout && (
          <PhotoGrid
            screen={screen}
            photos={photos}
            onPressItem={this._handlePressImage}
            layout={this.state.layout}
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
    marginHorizontal: Constants.IS_TABLET ? 16 : 0,
  },
})

SingleAlbum.propTypes = propTypes
