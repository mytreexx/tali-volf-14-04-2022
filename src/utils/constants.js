export const API_KEY = process.env.REACT_APP_API_KEY

export const BASE_URL = 'http://dataservice.accuweather.com'

export const ENDPOINTS = {
    LOCATIONS: 'locations/v1/cities/autocomplete',
    FIVE_DAY_FORECAST: 'forecasts/v1/daily/5day',
    CURRENT_FORECAST: 'currentconditions/v1',
    GEOLOCATION: 'locations/v1/cities/geoposition/search'
}