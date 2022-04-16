import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import locationsSlice from './location/locationsSlice'
import userSettingsSlice from './userSettings/userSettingsSlice'
import weatherSlice from './weather/weatherSlice'
import favoriteSlice from './favorite/favoriteSlice'
import notificationSlice from './notification/notificationSlice'

import localStorageMiddleware from './middlewares/localStorageMiddleware'


const reducer = combineReducers({
    locations: locationsSlice,
    userSettings: userSettingsSlice,
    weather: weatherSlice,
    favorites: favoriteSlice,
    notification: notificationSlice,
})

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
})

export default store