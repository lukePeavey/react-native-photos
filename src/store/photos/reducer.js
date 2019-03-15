/* eslint-disable no-plusplus */
import console from '@utils/console'
import { stringifyLocation } from '@utils/geocode'
import { selectors as geolocationSelectors } from '@store/geolocations'
import { actionTypes } from './actions'

/**
|--------------------------------------------------
| Initial State
|--------------------------------------------------
*/
export const initialState = {
  photos: {},
  albums: [{ name: 'Camera Roll' }],
}

/**
|--------------------------------------------------
| Reducer
|--------------------------------------------------
*/
export default function photosReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SAVE_PHOTOS: {
      return { ...state, photos: action.payload }
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
      .map(({ id }) => this.getPhotoByID(state, id))
  },

  /** Get all photos to display on the "My Photos" screen */
  getPhotoByID(state, id) {
    const photo = state.photos.photos[id]
    const GEOLOCATION = stringifyLocation(photo.location)
    const address = geolocationSelectors.getFormattedAddress(state, GEOLOCATION)
    return { ...photo, address }
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
      return photos
    } else {
      // Other albums have an array of image IDs.
      // First get the album object which has an array of image IDs.
      // Then map the image IDs to an array of actual image objects
      const album = this.getAlbumByName(state, albumName)
      if (album) {
        return album.imageIDs.map(id => this.getPhotoByID(state, id))
      } else {
        console.warn(
          '[selectors.getPhotosByAlbum]',
          `The album name "${albumName}" does not exist`
        )
        return []
      }
    }
  },
}
