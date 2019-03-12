import React from 'react'
import PropTypes from 'prop-types'
import {
  Animated,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { PhotoPropType, ScreenPropType, NavigationPropType } from '../../types'

const propTypes = {
  /** Screen dimensions */
  screen: ScreenPropType.isRequired,
  /** The array of images to display  */
  images: PropTypes.arrayOf(PhotoPropType).isRequired,
  /** React navigation prop */
  navigation: NavigationPropType.isRequired,
}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

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

  // Animated scroll value
  _animatedScroll = new Animated.Value(0)

  // Pipe the scroll position to `this._animatedScroll`
  _onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: this._animatedScroll } } }],
    { useNativeDriver: true }
  )

  componentDidUpdate = prevProps => {
    // After screen orientation changes...
    if (prevProps.screen.width !== this.props.screen.width) {
      // The scroll position needs to updated after orientation change...
      if (this._FlatList.current) {
        this._FlatList.current.getNode().scrollToIndex({
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
      return image.height / image.width > 1 ? 'contain' : 'cover'
    } else {
      return image.height / image.width < 1 ? 'contain' : 'cover'
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

  /**
   * Returns an interpolated scroll offset value for each item.
   * The output range is `[-1, 0, 1]`.
   */
  _getInterpolatePosition = index => {
    const { images, screen } = this.props
    // Input range is calculated based on index
    const inputRange = [
      (index - 1) * screen.width,
      index * screen.width,
      (index + 1) * screen.width,
    ]
    // Output range for all images except first and last
    let outputRange = [-1, 0, 1]
    // Output range for the FIRST image in the slider
    if (index === 0) outputRange = [0, 0, 1]
    // Output range for the LAST image in the slider
    if (index === images.length - 1) outputRange = [-1, 0, 0]

    // Return the interpolated value
    return this._animatedScroll.interpolate({
      inputRange,
      outputRange,
      extrapolate: 'clamp',
    })
  }

  /**
   * Renders each item in the slider
   */
  _renderItem = ({ item, index }) => {
    const { screen } = this.props
    const position = this._getInterpolatePosition(index)

    // Animation styles applied to the outer `<View />`:
    // The scaleX creates a space between images that is only visible when
    // scrolling. The current image always fills the full width of the screen
    // while the images to the right and left are scaled down.
    const scaleX = position.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [0.95, 1, 0.95],
    })
    const viewStyles = {
      height: screen.height,
      width: screen.width,
      transform: [{ scaleX }],
    }

    // Animation styles applied to the `<Image />`:
    const translateX = position.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [-150, 0, 150],
      extrapolate: 'clamp',
    })
    // The image is translated along X axis as it is swiped right or left to
    // create a subtle  parallax effect.
    const imageStyles = {
      transform: [{ translateX }],
    }

    return (
      <TouchableWithoutFeedback onPress={this._toggleFullScreen}>
        <Animated.View style={[styles.item, viewStyles]}>
          <Animated.Image
            source={{ uri: item.image.uri }}
            style={[styles.image, imageStyles]}
            resizeMode={this._getResizeMode(item.image)}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  }

  render() {
    const { images } = this.props
    return (
      <React.Fragment>
        <NavigationEvents
          onWillFocus={this.componentWillFocus}
          onWillBlur={this.componentWillBlur}
        />
        <AnimatedFlatList
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
          scrollEventThrottle={16}
          onScroll={this._onScroll}
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
