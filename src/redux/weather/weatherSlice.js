import axios from 'axios'
import { createSlice } from '@reduxjs/toolkit'
import { BASE_URL, ENDPOINTS, API_KEY } from '../../utils/constants'
import { setNotification } from '../notification/notificationSlice'


export const weatherSlice = createSlice({
    name: 'forecasts',
    initialState: {
        loading: false,
        currentForecast: [],
        dailyForecast: {},
    },
    reducers: {
        setForecast: (state, action) => {
            state[action.payload.property] = action.payload.value
        },
        
        setLoading: (state, action) => {
            state.loading = action.payload
        },
    }
})

export const getCurrentWeather = (cityCode) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const res = await axios.get(`${BASE_URL}/${ENDPOINTS.CURRENT_FORECAST}/${cityCode}`, {
            params: {
                apikey: API_KEY
            }
        })
        if (res.status === 200) {
            dispatch(setForecast({ property: 'currentForecast', value: res.data }))
            dispatch(setLoading(false))
        } else {
            dispatch(setNotification({ error: true, message: 'Error loading forecast' }))
        }
    } catch (error) {
        dispatch(setLoading(false))
        dispatch(setNotification({ error: true, message: 'Error loading forecast' }))
    }
}

export const getDailyWeather = (cityCode, isMetric) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const res = await axios.get(`${BASE_URL}/${ENDPOINTS.FIVE_DAY_FORECAST}/${cityCode}`, {
            params: {
                apikey: API_KEY
            }
        })
        if (res.status === 200) {
            dispatch(setForecast({ property: 'dailyForecast', value: res.data }))
            dispatch(setLoading(false))
        } else {
            dispatch(setNotification({ error: true, message: 'Error loading forecast' }))
        }
    } catch (error) {
        dispatch(setLoading(false))
        dispatch(setNotification({ error: true, message: 'Error loading forecast' }))
    }
}


export const {
    setForecast,
    setLoading,
} = weatherSlice.actions

export default weatherSlice.reducer
