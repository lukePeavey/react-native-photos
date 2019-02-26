import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native'
import { NavigationEvents } from 'react-navigation'
import imageURI from '@utils/imageURI'
import { PhotoPropType, ScreenPropType, NavigationPropType } from '../../types'

const propTypes = {
  /** Screen dimensions */
  screen: ScreenPropType.isRequired,
  /** The array of images to display  */
  images: PropTypes.arrayOf(PhotoPropType).isRequired,
  /** React navigation prop */
  navigation: NavigationPropType.isRequired,
}

export default class PhotoViewer extends React.PureComponent {
  static propTypes = propTypes

  static navigationOptions = ({ navigation }) => {
    // Hide the header in fullscreen mode
    if (navigation.getParam('isFullscreen')) {
      return { header: null }
    }
    return {}
  }

  // Keep track of the active image index. This is not stored in state
  // to avoid causing an additional re-render after the visible image changes
  _index = this.props.navigation.getParam('initialIndex') || 0

  // Reference to the FlatList instance
  _FlatList = React.createRef()

  // Determines when the viewable item changes
  _viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
    minimumViewTime: 1,
  }

  componentDidUpdate = prevProps => {
    // After screen orientation changes...
    if (prevProps.screen.width !== this.props.screen.width) {
      // The scroll position needs to updated after orientation change...
      if (this._FlatList.current) {
        this._FlatList.current.scrollToIndex({
          index: this._index,
          animated: false,
        })
      }
    }
  }

  /** Navigation event */
  componentWillFocus = () => {
    // Hide the status bar when navigating to this screen if fullscreen mode
    // is enabled
    StatusBar.setHidden(this.props.navigation.getParam('isFullscreen'), 'fade')
  }

  /** Navigation event */
  componentWillBlur = () => {
    // Un-hide the status bar when leaving this screen
    StatusBar.setHidden(this.props.screen.isLandscape, 'fade')
  }

  /**
   * Toggles fullscreen mode
   *
   * In fullscreen mode: the navigation bar and status bar are hidden, and the
   * ~screen background color changes from white to black~
   *
   * @TODO Find a way to change background color of the RootView. Otherwise
   * white edges are visible when changing device orientation. For now just
   * leave background white in fullscreen.
   * @TODO when switching in/out of fullscreen mode, the header/status bar
   * should fade in/out.
   */
  _toggleFullScreen = () => {
    const { navigation, screen } = this.props
    const isFullscreen = navigation.getParam('isFullscreen')
    navigation.setParams({
      isFullscreen: !isFullscreen,
    })
    StatusBar.setHidden(screen.isLandscape || !isFullscreen)
  }

  // Determines which resize mode to use for images
  _getResizeMode = image => {
    const { screen } = this.props
    if (screen.isLandscape) {
      return image.aspectRatio > 1 ? 'contain' : 'cover'
    } else {
      return image.aspectRatio < 1 ? 'contain' : 'cover'
    }
  }

  _keyExtractor = item => item.id

  /** Used to determine the size of each item in the scrollView */
  _getItemLayout = (_, index) => ({
    length: this.props.screen.width,
    offset: this.props.screen.width * index,
    index,
  })

  /**
   * This is called when the visible item changes
   */
  _onViewableItemsChanged = event => {
    const { viewableItems } = event
    const nextIndex = viewableItems.length && viewableItems[0].index
    if (Number.isFinite(nextIndex) && nextIndex !== this._index) {
      this._index = nextIndex
    }
  }

  _renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={this._toggleFullScreen}>
        <View style={[styles.item, this.props.screen]}>
          <Image
            source={{ uri: imageURI(item.id, 800) }}
            style={styles.image}
            resizeMode={this._getResizeMode(item)}
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }

  render() {
    const { images, navigation } = this.props
    return (
      <React.Fragment>
        <NavigationEvents
          onWillFocus={this.componentWillFocus}
          onWillBlur={this.componentWillBlur}
        />
        <FlatList
          data={images}
          renderItem={this._renderItem}
          style={styles.container}
          initialScrollIndex={this._index}
          initialNumToRender={1}
          onViewableItemsChanged={this._onViewableItemsChanged}
          getItemLayout={this._getItemLayout}
          pagingEnabled
          removeClippedSubviews
          viewabilityConfig={this._viewabilityConfig}
          horizontal
          keyExtractor={this._keyExtractor}
          ref={this._FlatList}
        />
      </React.Fragment>
    )
  }
}

PhotoViewer.propTypes = propTypes

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#FFF',
  },
  item: {
    overflow: 'hidden',
    backgroundColor: 'transparent',
    flexGrow: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    backgroundColor: 'transparent',
    position: 'relative',
    width: '100%',
    height: '100%',
  },
})
