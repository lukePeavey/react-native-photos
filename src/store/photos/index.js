import images from '@data/images.json'
import collections from '@data/collections.json'
import albums from '@data/albums.json'

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
  images,
  collections,
  albums,
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
  getPhotoById(state, id) {
    return state.photos.images.find(image => image.id === id)
  },

  /** Gets the photos from a given collection by ID */
  getPhotosByCollection(state, collectionID) {
    return state.photos.images.filter(
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
    return state.photos.albums.map(album => ({
      ...album,
      images: album.id === 'camera-roll' ? state.photos.images : album.images,
    }))
  },
}
