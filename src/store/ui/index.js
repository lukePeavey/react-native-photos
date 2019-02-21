import { Dimensions } from 'react-native'

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

/**
|--------------------------------------------------
| Reducer
|--------------------------------------------------
*/
export const initialState = {
  screen: Dimensions.get('screen'),
}

export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.UPDATE_SCREEN_DIMENSIONS: {
      return { ...state, screen: action.payload }
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
  getScreen: ({ ui: state }) => ({
    width: state.screen.width,
    height: state.screen.height,
    isLandscape: state.screen.width > state.screen.height,
  }),
}
