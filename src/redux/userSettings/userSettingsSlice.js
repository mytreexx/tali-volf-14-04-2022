import { createSlice } from '@reduxjs/toolkit'


const defaultSettings = {
    theme: 'dark',
    isMetric: true
}

const initialState = localStorage.getItem('settings') ? JSON.parse(localStorage.getItem('settings')) : defaultSettings

export const userSettingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setSettings: (state, action) => {
            state[action.payload.property] = action.payload.value
        },
    }
})

export const {
    setSettings
} = userSettingsSlice.actions

export default userSettingsSlice.reducer
