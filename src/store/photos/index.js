/* eslint-disable no-plusplus */
import console from '@utils/console'
import { stringifyLocation, reverseGeocode } from '@utils/geocode'
/**
|--------------------------------------------------
| actions
|--------------------------------------------------
*/
export const actionTypes = {
  SAVE_PHOTOS: 'SAVE_PHOTOS',
  SAVE_GEOLOCATIONS: 'SAVE_GEOLOCATIONS',
}

export const actions = {
  /** Saves data from the devices cameral roll to redux state */
  savePhotos: photos => ({
    type: actionTypes.SAVE_PHOTOS,
    payload: photos,
  }),
  saveGeolocationData: geolocations => ({
    type: actionTypes.SAVE_GEOLOCATIONS,
    payload: geolocations,
  }),
  reverseGeocodeImageLocations() {
    return (dispatch, getState) => {
      const { photos, geolocations } = getState().photos
      let idx = 0
      // We need to make a separate API request for each location.
      // Requests have to be rate limited to avoid exceeding the max
      // number of requests per second.  The promise will resolve once
      // all of the API calls have completed.
      return Promise.all(
        // Iterate through the photos in state...
        Object.values(photos).map(item => {
          const LATITUDE_LONGITUDE = stringifyLocation(item.location)
          // Check if the location for this image has already been cached
          if (!LATITUDE_LONGITUDE || geolocations[item.id]) {
            return null
          } else {
            // limit request rate to 49 requests every 2 seconds
            const timeout = Math.floor(idx++ / 49) * 2000
            // Send a reverse-geocode request to the Google Maps API.
            // Converts the latitude,longitude to an human readable address.
            // Returns an array `[imageID, Address || null]`
            return reverseGeocode(item, timeout)
          }
        })
      )
        .then(data => {
          dispatch(this.saveGeolocationData(data.filter(el => el)))
        })
        .catch(error => {
          console.error('[getGeolocationData]', error)
        })
    }
  },
}

/**
|--------------------------------------------------
| Reducer
|--------------------------------------------------
*/
export const initialState = {
  isFinishedGeocoding: false,
  geolocations: {},
  photos: {},
  albums: [{ name: 'Camera Roll' }],
}

/**
 * Manages photos state
 * @TODO normalize photo data from camera roll
 */
export default function photosReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SAVE_PHOTOS: {
      return { ...state, photos: action.payload }
    }
    case actionTypes.SAVE_GEOLOCATIONS: {
      // Converts the 2d array geolocations returned by `getGeolocationData`
      // to an object map where keys are `longitude,latitude` string
      // and value
      const geolocations = action.payload.reduce((result, [key, value]) => {
        return { ...result, [key]: value }
      }, {})
      return {
        ...state,
        geolocations: { ...state.geolocations, ...geolocations },
        isFinishedGeocoding: true,
      }
    }
    default: {
      return state
    }
  }
}

/**
|--------------------------------------------------
| Selectors
|--------------------------------------------------
*/
export const selectors = {
  /** Get all photos (sorted by timestamp in descending order) */
  getPhotos(state) {
    return Object.values(state.photos.photos)
      .sort((a, b) => a.timestamp - b.timestamp)
      .map(item => ({
        ...item,
        address: state.photos.geolocations[item.id],
      }))
  },

  /** Get all photos to display on the "My Photos" screen */
  getPhotoByID(state, id) {
    const photo = state.photos.photos[id]
    return { ...photo, location: state.photos.geolocations[photo.id] }
  },

  getPhotoGeolocation(state, photoID) {
    const photo = state.photos.photos[photoID]
    const location = photo && stringifyLocation(photo.location)
    return (location && state.photos.geolocations[location]) || null
  },

  /**
   * Get the list of albums to display on "Albums" screen
   */
  getAlbums(state) {
    const photos = Object.values(state.photos.photos)
    return state.photos.albums.map(album => {
      if (album.name === 'Camera Roll') {
        return {
          ...album,
          coverImage: photos[0],
          count: photos.length,
        }
      } else {
        return {
          ...album,
          coverImage: this.getPhotoByID(state, album.imageIDs[0]),
          count: album.imageIDs.length,
        }
      }
    })
  },

  /**
   * Get an album object by album name
   */
  getAlbumByName(state, name) {
    return state.photos.albums.find(item => item.name === name)
  },

  /**
   * Get the photos in a given album
   */
  getPhotosByAlbum(state, albumName) {
    const photos = this.getPhotos(state)
    // The Camera Roll album is all photos in the library
    if (albumName === 'Camera Roll') {
      return photos.map(item => ({
        ...item,
        address: state.photos.geolocations[item.id],
      }))
    } else {
      // Other albums have an array of image IDs.
      // First get the album object which has an array of image IDs.
      // Then map the image IDs to an array of actual image objects
      const album = this.getAlbumByName(state, albumName)
      if (album == null) {
        console.warn(
          '[selectors.getPhotosByAlbum]',
          `The album name "${albumName}" does not exist`
        )
        return []
      }
      return album.imageIDs.map(id => ({
        ...photos[id],
        address: state.photos.geolocations[id],
      }))
    }
  },
}
