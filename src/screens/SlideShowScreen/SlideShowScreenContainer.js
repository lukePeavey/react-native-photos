import { connect } from 'react-redux'
import { selectors } from '@store'
import SlideShowScreen from './SlideShowScreen'

const mapStateToProps = state => ({
  images: selectors.photos.getPhotos(state),
  screen: selectors.ui.getScreen(state),
})

export default connect(mapStateToProps)(SlideShowScreen)
