/* eslint-disable */
import PropTypes from 'prop-types'

export const NavigationPropType = PropTypes.shape({
  navigate: PropTypes.func.isRequired,
  getParam: PropTypes.func.isRequired,
  setParams: PropTypes.func.isRequired,
})

export const ScreenPropType = PropTypes.shape({
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  isLandscape: PropTypes.bool.isRequired,
})

export const PhotoPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  aspectRatio: PropTypes.number.isRequired,
  date: PropTypes.string,
  location: PropTypes.string,
})

export const AlbumPropType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PhotoPropType),
})

export const Collection = PropTypes.shape({
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
})
