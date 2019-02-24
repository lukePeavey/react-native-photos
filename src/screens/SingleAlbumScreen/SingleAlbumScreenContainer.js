import { connect } from 'react-redux'
import { selectors } from '@store'
import SingleAlbumScreen from './SingleAlbumScreen'

const mapStateToProps = (state, props) => {
  const albumID = props.navigation.getParam('id')
  return {
    images: selectors.photos.getPhotosByAlbum(state, albumID),
    screen: selectors.ui.getScreen(state),
  }
}

export default connect(mapStateToProps)(SingleAlbumScreen)
