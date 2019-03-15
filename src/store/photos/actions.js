/**
|--------------------------------------------------
| action Types
|--------------------------------------------------
*/
export const actionTypes = {
  SAVE_PHOTOS: 'SAVE_PHOTOS',
}

/**
|--------------------------------------------------
| actions
|--------------------------------------------------
*/
export const actions = {
  /** Saves data from the devices cameral roll to redux state */
  savePhotos: photos => ({
    type: actionTypes.SAVE_PHOTOS,
    payload: photos,
  }),
}
