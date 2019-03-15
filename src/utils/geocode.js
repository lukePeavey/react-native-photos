import { stringify } from 'query-string'
import delay from '@utils/delay'
import console from '@utils/console'
import { GOOGLE_MAPS_KEY } from '../../secret'

const API_BASE = 'https://maps.googleapis.com/maps/api/geocode/json'

/**
 * Makes a reveres-geocoding request to the Google Maps API
 *
 * @param {Object} location
 * @param {string} location.latitude
 * @param {string} location.longitude
 * @param {number} timeout number of ms to wait before making request
 * @return {Array} ["<LATITUDE>,<LONGITUDE>", Place | null]
 */
export async function reverseGeocode(location, timeout = 0) {
  const GEOLOCATION = stringifyLocation(location)
  try {
    const params = {
      result_type: 'locality',
      key: GOOGLE_MAPS_KEY,
      latlng: GEOLOCATION,
    }
    // Wait for the specified timeout before sending request
    await delay(timeout)
    console.log(GEOLOCATION)
    const response = await fetch(`${API_BASE}?${stringify(params)}`)
    const data = await response.json()
    if (data.results[0]) {
      // Return the formatted_address field from the first result
      const result = data.results[0].formatted_address
      return [GEOLOCATION, result]
    }
  } catch (error) {
    console.log(error)
  }
  return [GEOLOCATION, null]
}

export const stringifyLocation = location => {
  if (!location || !(location.longitude && location.latitude)) return ''
  return `${location.latitude},${location.longitude}`
}
