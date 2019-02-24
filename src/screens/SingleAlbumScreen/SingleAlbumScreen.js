/* eslint-disable no-unused-vars */
import React from 'react'
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native'
import PropTypes from 'prop-types'
import imageURI from '@utils/imageURI'

const propTypes = {
  /** React navigation prop */
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  /** Screen dimensions  */
  screen: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    isLandscape: PropTypes.bool.isRequired,
  }).isRequired,
  /** Array of images */
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
}

const IS_TABLET = Platform.OS === 'ios' && Platform.isPad
const GUTTERS = IS_TABLET ? 16 : 2
const ASPECT_RATIO = 1
const RESIZE_MODE = IS_TABLET ? 'contain' : 'cover'

/**
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
    title: navigation.getParam('title'),
  })

  /** The number of columns in the image grid */
  get _columns() {
    const { screen } = this.props
    if (IS_TABLET) {
      return screen.isLandscape ? 7 : 5
    }
    return screen.isLandscape ? 7 : 4
  }

  /** The width height of each image */
  get _imageSize() {
    const { screen } = this.props
    const width = (screen.width - GUTTERS * 2) / this._columns

    return { width, height: width * ASPECT_RATIO }
  }

  _handlePressImage = (image, index) => {
    const { navigation } = this.props
    navigation.navigate('SlideShow', {
      albumID: navigation.getParam('id'),
      initialIndex: index,
      isFullscreen: true,
      image,
    })
  }

  /** Renders the header for each image collection */
  _renderSectionHeader = section => {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.title}>{section.location}</Text>
        <Text style={styles.subTitle}>{section.date}</Text>
      </View>
    )
  }

  /**
   * Renders an individual item.
   */
  _renderItem = (item, index) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => this._handlePressImage(item, index)}
        key={item.id}
      >
        <View style={[styles.item, this._imageSize]} key={item.id}>
          <Image
            source={{ uri: imageURI(item.id, 200) }}
            style={styles.image}
            resizeMode={RESIZE_MODE}
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }

  render() {
    const { images } = this.props
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.grid}>
        {images.map(this._renderItem)}
      </ScrollView>
    )
  }
}

SingleAlbum.propTypes = propTypes

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: GUTTERS,
  },
  grid: {
    position: 'relative',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    padding: IS_TABLET ? 4 : StyleSheet.hairlineWidth,
  },
  image: {
    width: '100%',
    height: '100%',
  },
})
