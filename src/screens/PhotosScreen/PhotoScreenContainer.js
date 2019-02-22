import { connect } from 'react-redux'
import { selectors } from '@store'
import PhotoScreen from './PhotosScreen'

const mapStateToProps = state => ({
  collections: selectors.photos.getCollections(state),
  screen: selectors.ui.getScreen(state),
})

export default connect(mapStateToProps)(PhotoScreen)
