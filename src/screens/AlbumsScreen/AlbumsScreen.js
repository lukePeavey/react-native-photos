/* eslint-disable no-unused-vars */
import React from 'react'
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native'
import PropTypes from 'prop-types'
import imageURI from '@utils/imageURI'
import { AlbumPropType, ScreenPropType, NavigationPropType } from '../../types'

const SPACING = 24
const ASPECT_RATIO = 1

const propTypes = {
  /** React navigation prop */
  navigation: NavigationPropType.isRequired,
  /** Screen dimensions  */
  screen: ScreenPropType.isRequired,
  /** Array of albums  */
  albums: PropTypes.arrayOf(AlbumPropType).isRequired,
}

/**
 * This screen displays a list of the user's albums.
 */
export default class AlbumsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'My Albums',
    headerBackTitle: 'Albums',
  })

  get _columns() {
    const { screen } = this.props
    if (screen.width > 414) return 4
    return 2
  }

  get _imageSize() {
    const { screen } = this.props
    const width = (screen.width - SPACING * (this._columns + 1)) / this._columns
    return { width, height: width * ASPECT_RATIO }
  }

  _handlePress = album => () => {
    const { navigation } = this.props
    navigation.navigate('SingleAlbum', {
      title: album.title,
      id: album.id,
    })
  }

  render() {
    const { albums } = this.props
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.grid}>
        {albums.map(album => {
          const { coverImage, count } = album
          return (
            <TouchableWithoutFeedback
              onPress={this._handlePress(album)}
              key={album.id}
            >
              <View style={[styles.gridItem]}>
                <Image
                  source={{ uri: imageURI(coverImage.id, 200) }}
                  style={[styles.albumCover, this._imageSize]}
                />
                <View style={styles.albumLabel}>
                  <Text style={styles.primaryText}>{album.title}</Text>
                  <Text style={styles.secondaryText}>{count}</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          )
        })}
      </ScrollView>
    )
  }
}

AlbumsScreen.propTypes = propTypes

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING / 2,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    margin: SPACING / 2,
    marginBottom: 16,
    flexGrow: 0,
    flexBasis: 'auto',
  },
  albumCover: {
    borderRadius: 4,
    overflow: 'hidden',
  },
  albumLabel: {
    paddingVertical: 8,
  },
  primaryText: {
    color: 'rgba(0,0,0,0.9)',
    fontWeight: '600',
  },
  secondaryText: {
    color: 'rgba(0,0,0,0.37)',
    fontWeight: '600',
  },
})
