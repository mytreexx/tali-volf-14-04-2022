import axios from 'axios'
import { createSlice } from '@reduxjs/toolkit'
import { BASE_URL, ENDPOINTS, API_KEY } from '../../utils/constants'
import { setNotification } from '../notification/notificationSlice'


export const locationsSlice = createSlice({
    name: 'locations',
    initialState: {
        loading: false,
        locations: [],
        currentLocation: {
            code: '215854',
            name: 'Tel Aviv'
        }
    },
    reducers: {
        setLocations: (state, action) => {
            state.locations = action.payload
        },

        setCurrentLocation: (state, action) => {
            state.currentLocation.code = action.payload.code
            state.currentLocation.name = action.payload.name
        },

        setLoading: (state, action) => {
            state.loading = action.payload
        },
    }
})

export const getGeolocation = (latitude, longitude) => async (dispatch) => {
    try {
        dispatch(setLoading(true))

        const res = await axios.get(`${BASE_URL}/${ENDPOINTS.GEOLOCATION}`, {
            params: {
                apikey: API_KEY,
                q: `${latitude},${longitude}`,
            }
        })

        if (res.status === 200) {
            dispatch(setCurrentLocation({
                code: res.data.Key,
                name: res.data.LocalizedName,
            }))
        } else {
            dispatch(setNotification({ error: true, message: 'Error loading locations' }))
        }

        dispatch(setLoading(false))
    } catch (error) {
        dispatch(setLoading(false))
        dispatch(setNotification({ error: true, message: 'Error loading locations' }))
    }
}

export const getSearchedLocations = (searchTerm) => async (dispatch) => {
    try {
        dispatch(setLoading(true))

        const res = await axios.get(`${BASE_URL}/${ENDPOINTS.LOCATIONS}`, {
            params: {
                q: searchTerm,
                apikey: API_KEY
            }
        })

        if (res.status === 200) {
            dispatch(setLocations(res.data))
        } else {
            dispatch(setNotification({ error: true, message: 'Error loading locations' }))
        }

        dispatch(setLoading(false))
    } catch (error) {
        dispatch(setLoading(false))
        dispatch(setNotification({ error: true, message: 'Error loading locations' }))
    }
}


export const {
    setLocations,
    setLoading,
    setCurrentLocation
} = locationsSlice.actions

export default locationsSlice.reducer
