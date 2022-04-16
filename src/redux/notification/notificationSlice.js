import { createSlice } from '@reduxjs/toolkit'


export const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        open: false,
        error: false,
        message: '',
    },
    reducers: {
        setNotification: (state, action) => {
            state.open = true
            state.error = action.payload.error
            state.message = action.payload.message
        },

        closeNotification: (state) => {
            state.open = false
        },
    }
})


export const {
    setNotification,
    closeNotification,
} = notificationSlice.actions

export default notificationSlice.reducer
