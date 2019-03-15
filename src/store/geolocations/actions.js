/* eslint-disable no-plusplus */
import { reverseGeocode, stringifyLocation } from '@utils/geocode'

/**
|--------------------------------------------------
| Action Types
|--------------------------------------------------
*/
export const actionTypes = {
  SAVE_LOCATIONS: 'SAVE_LOCATIONS',
}

/**
|--------------------------------------------------
| Action Creators
|--------------------------------------------------
*/
export const actions = {
  saveLocations(data) {
    return {
      type: actionTypes.SAVE_LOCATIONS,
      payload: data,
    }
  },
  /**
   * Reverse geocode image locations for all photos in the library.
   * The results are stored in an object map using "<LATITUDE>,<LONGITUDE>"
   * as keys.
   */
  reverseGeocodeImageLocations() {
    return (dispatch, getState) => {
      const { photos } = getState().photos
      const { locations } = getState().geolocations
      let idx = 0
      // We need to make an API request for each location.
      // The promise will resolve once all of the API calls have completed.
      return Promise.all(
        // Return an array of key value pairs for all the unique geolocations
        // that have not already been cached.
        Object.values(photos).reduce((result, item) => {
          const GEOLOCATION = stringifyLocation(item.location)
          // If the image doesn't have geolocation, or the geolocation is
          // already cached, skip to the  next item.
          if (!GEOLOCATION || GEOLOCATION in locations) {
            return result
          }
          // Otherwise, make an API request to convert the geolocation to an
          // address. Requests have to be rate limited to avoid exceeding
          // per-second limits. Need to figure out a better solution for this
          const timeout = Math.floor(idx++ / 49) * 2000
          return [...result, reverseGeocode(item.location, timeout)]
        }, [])
      )
        .then(results => {
          // Convert the array of key value pairs to an object map:
          const data = results.reduce((result, [GEOLOCATION, Address]) => {
            return { ...result, [GEOLOCATION]: Address }
          }, {})
          dispatch(this.saveLocations(data))
        })
        .catch(error => {
          console.error('[getGeolocationData]', error)
        })
    }
  },
}
