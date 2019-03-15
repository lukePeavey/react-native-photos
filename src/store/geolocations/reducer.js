import { actionTypes } from './actions'

/**
|--------------------------------------------------
| Initial State
|--------------------------------------------------
*/
const initialState = {
  isFinishedGeocoding: false,
  locations: {},
}

/**
|--------------------------------------------------
| Reducer
|--------------------------------------------------
*/
export default function geolocationsReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SAVE_LOCATIONS: {
      return {
        ...state,
        locations: { ...state.locations, ...action.payload },
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
  getFormattedAddress(state, LATITUDE_LONGITUDE) {
    return state.geolocations.locations[LATITUDE_LONGITUDE] || null
  },
}
