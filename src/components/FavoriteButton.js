import { IconButton } from "@mui/material"
import { FavoriteBorderOutlined, FavoriteSharp } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { addFavorite, removeFavorite } from "../redux/favorite/favoriteSlice"
import { setNotification } from "../redux/notification/notificationSlice"


const FavoriteButton = ({ city }) => {
    const dispatch = useDispatch()

    const favoriteCities = useSelector(state => state.favorites.list)

    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => {
        setIsFavorite(favoriteCities.some(favoriteCity => favoriteCity.code === city.code))
    }, [favoriteCities, city])

    const toggleFavorite = () => {
        if (isFavorite) {
            dispatch(removeFavorite(city))
            dispatch(setNotification({ message: 'Successfully removed from favorites' }))
        } else {
            dispatch(addFavorite(city))
            dispatch(setNotification({ message: 'Successfully added to favorites' }))
        }
    }

    return (
        <IconButton onClick={toggleFavorite}>
            {isFavorite ? <FavoriteSharp color='primary' /> : <FavoriteBorderOutlined color='primary' />}
        </IconButton>
    )
}

export default FavoriteButton