import { Grid, Typography } from "@mui/material"
import CurrentWeatherCard from "../components/CurrentWeatherCard"
import { useStyles } from "../styles.js/global"
import { useDispatch, useSelector } from "react-redux"
import { setCurrentLocation } from "../redux/location/locationsSlice"
import { useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import ErrorMessage from "../components/ErrorMessage"


const FavoritesPage = () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const navigate = useNavigate()

    const favoriteCities = useSelector(state => state.favorites.list)

    const goToForecastPage = (city) => {
        dispatch(setCurrentLocation(city))
        navigate('/')
    }

    const isListEmpty = (favoriteCities.length === 0)

    return (
        <Grid container justifyContent='center' className={classes.pageContainer}>
            <Helmet>
                <title>weatherApp - Favorites</title>
            </Helmet>
            <Grid item className={classes.maxWidth}>
                <Grid container spacing={4} justifyContent='center'>
                    <Grid item xs={11}>
                        <Typography variant='h4'>Favorites</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container spacing={3} justifyContent='center'>
                            {isListEmpty && <Grid item xs={10}>
                                <ErrorMessage>No Favorites</ErrorMessage>
                            </Grid>}

                            {favoriteCities.map((city) =>
                                <Grid item xs={12} key={city.code}>
                                    <CurrentWeatherCard city={city} onClick={() => goToForecastPage(city)} />
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default FavoritesPage
