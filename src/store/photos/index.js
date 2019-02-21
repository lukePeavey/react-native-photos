import photos from '@data/images.json'
import collections from '@data/collections.json'

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
  photos,
  collections,
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
  getCollections: ({ photos: state }) => state.collections,
  getPhotosByCollection: ({ photos: state }, collectionID) => {
    return state.photos.filter(photo => photo.collection === collectionID)
  },
}
