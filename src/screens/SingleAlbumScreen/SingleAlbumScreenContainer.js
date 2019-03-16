import { connect } from 'react-redux'
import { selectors } from '@store'
import SingleAlbumScreen from './SingleAlbumScreen'

const mapStateToProps = (state, props) => {
  const albumName = props.navigation.getParam('albumName')
  return {
    photos: selectors.photos.getPhotosByAlbum(state, albumName),
    screen: selectors.ui.getScreen(state),
  }
}

export default connect(mapStateToProps)(SingleAlbumScreen)
