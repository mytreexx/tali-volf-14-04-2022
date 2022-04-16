import * as favoriteActions from '../favorite/favoriteSlice'
import * as userSettingsActions from '../userSettings/userSettingsSlice'


const localStorageMiddleware = (store) => (next) => (action) => {
    next(action)

    if (favoriteActions.addFavorite.match(action) || favoriteActions.removeFavorite.match(action)) {
        localStorage.setItem('favorites', JSON.stringify(store.getState().favorites.list))
        return
    }

    if (userSettingsActions.setSettings.match(action)) {
        localStorage.setItem('settings', JSON.stringify(store.getState().userSettings))
        return
    }
}

export default localStorageMiddleware