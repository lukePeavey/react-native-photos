import { Dimensions } from 'react-native'
import { actionTypes } from './actions'

/**
|--------------------------------------------------
| Initial State
|--------------------------------------------------
*/
export const initialState = {
  screen: Dimensions.get('screen'),
}

/**
|--------------------------------------------------
| Reducer
|--------------------------------------------------
*/
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
