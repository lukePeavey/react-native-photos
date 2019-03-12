import { connect } from 'react-redux'
import { selectors } from '@store'
import PhotoScreen from './PhotosScreen'

const mapStateToProps = state => ({
  photos: selectors.photos.getPhotos(state),
  screen: selectors.ui.getScreen(state),
})

export default connect(mapStateToProps)(PhotoScreen)
