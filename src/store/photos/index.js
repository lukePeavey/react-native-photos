import _images from '@data/images.json'
import _collections from '@data/collections.json'
import _albums from '@data/albums.json'

/**
|--------------------------------------------------
| actions
|--------------------------------------------------
*/
export const actionTypes = {}
export const actions = {}

/**
|--------------------------------------------------
| Reducer
|--------------------------------------------------
*/
export const initialState = {
  images: _images,
  collections: _collections,
  albums: _albums,
}

export default function photosReducer(state = initialState, action) {
  switch (action.type) {
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
  /** Get all photos */
  getPhotos(state) {
    return Object.values(state.photos.images)
  },

  /** Get single photo by ID */
  getPhotoById(state, id) {
    return state.photos.images.find(image => image.id === id)
  },

  /** Gets the photos from a given collection by ID */
  getPhotosByCollection(state, collectionID) {
    return Object.values(state.photos.images).filter(
      image => image.collection === collectionID
    )
  },

  /** Returns an array of "collections" */
  getCollections(state) {
    return state.photos.collections.map(collection => ({
      ...collection,
      images: this.getPhotosByCollection(state, collection.id),
    }))
  },

  getAlbums(state) {
    return state.photos.albums.map(album => {
      const isCameralRoll = album.id === 'camera-roll'
      const images = isCameralRoll
        ? Object.values(state.photos.images)
        : album.images.map(id => state.photos.images[id])
      return {
        ...album,
        images,
        coverImage: images[0],
      }
    })
  },
}
