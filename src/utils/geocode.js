import { MAP_BOX_BASE_URL } from '../constants.js';

const geocode = async (location) => {
  try {
    const response = await fetch(`${MAP_BOX_BASE_URL}/search/geocode/v6/forward?q=${encodeURIComponent(location)}&access_token=${process.env.MAP_BOX_API_KEY}&limit=1&country=UA`)
    const { features } = await response.json()
    const feature = features[0]

    if (feature) {
      const { latitude, longitude } = feature.properties.coordinates
      return { latitude, longitude, location: feature.properties.full_address }
    } else {
      await Promise.reject('Unable to find location. Please try with a different query')
    }
  } catch (err) {
    await Promise.reject(
      typeof err === 'string' ? err : 'Unable to connect to a geocoding service'
    )
  }
}

export default geocode