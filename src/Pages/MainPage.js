import { Grid, Typography } from "@mui/material"
import CurrentWeatherCard from "../components/CurrentWeatherCard"
import SearchBar from "../components/SearchBar"
import DailyForecast from "../components/DailyForecast"
import { useStyles } from "../styles.js/global"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as weatherActions from '../redux/weather/weatherSlice'
import { Helmet } from "react-helmet-async"


const MainPage = () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    
    const currentLocation = useSelector(state => state.locations.currentLocation)
    const dailyWeather = useSelector(state => state.weather.dailyForecast)
    const isMetric = useSelector(state => state.userSettings.isMetric)

    useEffect(() => {
        dispatch(weatherActions.getDailyWeather(currentLocation.code, isMetric))
    }, [currentLocation.code, isMetric])

    return (
        <Grid container justifyContent='center' className={classes.pageContainer}>
            <Helmet>
                <title>weatherApp - {currentLocation.name}</title>
            </Helmet>
            <Grid item className={classes.maxWidth}>
                <Grid container spacing={4} justifyContent='center'>
                    <Grid item xs={11}>
                        <SearchBar />
                    </Grid>

                    <Grid item xs={11}>
                        <Typography variant='h4'>Today's Weather</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <CurrentWeatherCard city={currentLocation} />
                    </Grid>
                    <Grid item xs={12}>
                        <DailyForecast dailyWeather={dailyWeather} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default MainPage
