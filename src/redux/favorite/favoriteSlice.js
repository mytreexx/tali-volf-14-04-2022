import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    list: localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : []
}

export const favoriteSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFavorite: (state, action) => {
            state.list.push({
                code: action.payload.code,
                name: action.payload.name
            })
        },
        
        removeFavorite: (state, action) => {
            state.list = state.list.filter(city => (city.code !== action.payload.code))
        },
    }
})


export const {
    addFavorite,
    removeFavorite,
} = favoriteSlice.actions

export default favoriteSlice.reducer