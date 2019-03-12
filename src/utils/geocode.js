import { stringify } from 'query-string'
import delay from '@utils/delay'
import { GOOGLE_MAPS_KEY } from '../../secret'

const API_BASE = 'https://maps.googleapis.com/maps/api/geocode/json'

/**
 * Makes a reveres-geocoding request to Google Maps API
 */
export async function reverseGeocode({ id, location }, timeout) {
  const { latitude, longitude } = location
  let result = null
  try {
    await delay(timeout)
    const params = {
      result_type: 'locality',
      key: GOOGLE_MAPS_KEY,
      latlng: `${latitude},${longitude}`,
    }
    const res = await fetch(`${API_BASE}?${stringify(params)}`)
    const data = await res.json()
    if (data.results[0]) {
      result = data.results[0].formatted_address
    }
  } catch (error) {
    if (__DEV__) console.log(error)
  }
  return [id, result]
}

export const stringifyLocation = location => {
  if (!location || !(location.longitude && location.latitude)) return ''
  return `${location.latitude},${location.longitude}`
}
