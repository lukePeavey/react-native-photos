/**
|--------------------------------------------------
| Actions
|--------------------------------------------------
*/
export const actionTypes = {
  UPDATE_SCREEN_DIMENSIONS: 'UPDATE_SCREEN_DIMENSIONS',
}

export const actions = {
  updateScreenDimensions: screen => ({
    type: actionTypes.UPDATE_SCREEN_DIMENSIONS,
    payload: screen,
  }),
}
