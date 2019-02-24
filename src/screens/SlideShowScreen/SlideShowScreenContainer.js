import { connect } from 'react-redux'
import { selectors } from '@store'
import SlideShowScreen from './SlideShowScreen'

const mapStateToProps = (state, props) => {
  // Check the `navigation` prop for an `albumID`. This will be present when
  // navigating to the image slider from an album screen. In that case the
  // slider should only contain images in that album. If there is no `albumID`,
  // the user navigated to the image slider from the Photos screen, so the
  // slider should include all images (aka 'cameral-roll').
  const albumID = props.navigation.getParam('albumID') || 'camera-roll'
  return {
    images: selectors.photos.getPhotosByAlbum(state, albumID),
    screen: selectors.ui.getScreen(state),
  }
}

export default connect(mapStateToProps)(SlideShowScreen)
