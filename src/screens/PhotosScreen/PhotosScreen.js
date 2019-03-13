import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Image,
} from 'react-native'
import PropTypes from 'prop-types'
import { PhotoPropType, ScreenPropType, NavigationPropType } from '../../types'

const IS_TABLET = Platform.OS === 'ios' && Platform.isPad
const GUTTERS = IS_TABLET ? 16 : 2
const ASPECT_RATIO = 1
const RESIZE_MODE = IS_TABLET ? 'contain' : 'cover'

const propTypes = {
  /** React navigation prop */
  navigation: NavigationPropType.isRequired,
  /** Screen dimensions */
  screen: ScreenPropType.isRequired,
  /** Array of image collections */
  photos: PropTypes.arrayOf(PhotoPropType).isRequired,
}

/**
 * This screen displays the photos in the user's camera roll.
 *
 * Photos are displayed as a grid of small thumbnail images, and grouped
 * into sections called collections.
 */
export default class PhotosScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Photos',
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
      initialIndex: index,
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
        <View style={[styles.item, this._imageSize]}>
          <Image
            source={{ uri: item.image.uri }}
            style={styles.image}
            resizeMode={RESIZE_MODE}
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }

  render() {
    const { photos } = this.props
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.grid}>
        {photos.map((item, index) => this._renderItem(item, index))}
      </ScrollView>
    )
  }
}

PhotosScreen.propTypes = propTypes

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
  sectionHeader: {
    minWidth: '100%',
    marginHorizontal: IS_TABLET ? 4 : 8,
    marginTop: IS_TABLET ? 20 : 28,
    marginBottom: IS_TABLET ? 8 : 16,
  },
  title: {
    fontSize: 18,
    lineHeight: 27,
    fontWeight: '500',
  },
  subTitle: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.45)',
  },
})
