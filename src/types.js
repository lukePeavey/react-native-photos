/* eslint-disable */
import PropTypes from 'prop-types'

/**
 * The React Navigation prop
 * @see https://reactnavigation.org/docs/en/navigation-prop
 */
export const NavigationPropType = PropTypes.shape({
  /** go to another screen, figures out the action it needs to take to do it */
  navigate: PropTypes.func.isRequired,
  /** close active screen and move back in the stack */
  goBack: PropTypes.func.isRequired,
  /** subscribe to updates to navigation lifecycle */
  addListener: PropTypes.func.isRequired,
  /** function that returns `true` if the screen is focused */
  isFocused: PropTypes.func.isRequired,
  /** current state/routes */
  state: PropTypes.object.isRequired,
  /**  make changes to route's params */
  setParams: PropTypes.func.isRequired,
  /** get a specific param with fallback */
  getParam: PropTypes.func.isRequired,
  /** send an action to router */
  dispatch: PropTypes.func.isRequired,
  /** function that returns the parent navigator, if any */
  dangerouslyGetParent: PropTypes.func.isRequired,
})

/**
 * An object containing current screen dimensions and orientation
 */
export const ScreenPropType = PropTypes.shape({
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  isLandscape: PropTypes.bool.isRequired,
})

/**
 * A photo identifier object from the cameral roll.
 * @see https://facebook.github.io/react-native/docs/cameraroll
 */
export const PhotoPropType = PropTypes.shape({
  /** A unique ID given to each photo (based on filename) */
  id: PropTypes.string.isRequired,
  /** Type of media asset */
  type: PropTypes.string,
  /** Unix timestamp (when the photo was taken) */
  timestamp: PropTypes.number,
  /** Geolocation data (where the photo was taken) */
  location: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    altitude: PropTypes.number,
    heading: PropTypes.number,
  }),
  /** Information about the image file */
  image: PropTypes.shape({
    uri: PropTypes.string.isRequired,
    filename: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
})

/**
 * A photo album object
 */
export const AlbumPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  coverImage: PhotoPropType.isRequired,
  imageIDs: PropTypes.arrayOf(PropTypes.string),
})
