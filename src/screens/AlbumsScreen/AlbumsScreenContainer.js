import { connect } from 'react-redux'
import { selectors } from '@store'
import AlbumScreen from './AlbumsScreen'

const mapStateToProps = state => ({
  screen: selectors.ui.getScreen(state),
  albums: selectors.photos.getAlbums(state),
})

export default connect(mapStateToProps)(AlbumScreen)
