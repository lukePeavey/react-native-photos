import console from '@utils/console'
/**
|--------------------------------------------------
| actions
|--------------------------------------------------
*/
export const actionTypes = {
  SAVE_PHOTOS: 'SAVE_PHOTOS',
}

export const actions = {
  /** Saves data from the devices cameral roll to redux state */
  savePhotos: photos => ({
    type: actionTypes.SAVE_PHOTOS,
    payload: photos,
  }),
}

/**
|--------------------------------------------------
| Reducer
|--------------------------------------------------
*/
export const initialState = {
  photos: [],
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
    return Object.values(state.photos.photos).sort(
      (a, b) => a.timestamp - b.timestamp
    )
  },

  /** Get all photos to display on the "My Photos" screen */
  getPhotoByID(state, id) {
    return state.photos.photos[id]
  },

  /**
   * Get the list of albums to display on "Albums" screen
   */
  getAlbums(state) {
    const photos = this.getPhotos(state)
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
      if (album == null) {
        console.warn(
          '[selectors.getPhotosByAlbum]',
          `The album name "${albumName}" does not exist`
        )
      }
      return album ? album.imageIDs.map(id => photos[id]) : []
    }
  },
}
