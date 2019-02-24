import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native'
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
    const options = {}
    if (navigation.getParam('isFullscreen')) {
      options.header = null
    }
    return options
  }

  // Keep track of the active image index. This is not stored in state
  // to avoid causing an additional re-render after the visible image changes
  _index = this.props.navigation.getParam('initialIndex') || 0

  // Reference to the FlatList instance
  _FlatList = React.createRef()

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
      <TouchableWithoutFeedback onPress={this._toggleNavBar}>
        <View style={[styles.item, this.props.screen]}>
          <Image
            source={{ uri: `${item.bucket}/${item.id}--1024.jpg` }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }

  _toggleNavBar = () => {
    const { navigation } = this.props
    navigation.setParams({
      isFullscreen: !navigation.getParam('isFullscreen'),
    })
  }

  render() {
    const { images, navigation } = this.props
    const isFullscreen = navigation.getParam('isFullscreen')
    const backgroundColor = isFullscreen ? '#111' : '#fff'
    return (
      <FlatList
        data={images}
        renderItem={this._renderItem}
        style={[styles.container, { backgroundColor }]}
        initialScrollIndex={this._index}
        initialNumToRender={1}
        onViewableItemsChanged={this._onViewableItemsChanged}
        getItemLayout={this._getItemLayout}
        pagingEnabled
        removeClippedSubviews
        horizontal
        keyExtractor={this._keyExtractor}
        ref={this._FlatList}
      />
    )
  }
}

PhotoViewer.propTypes = propTypes

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
    padding: 0,
  },
  item: {
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
