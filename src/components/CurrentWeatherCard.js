import { Grid, Paper, Typography } from "@mui/material"
import iconMap from "../utils/iconMap"
import { useStyles } from '../styles.js/global'
import { useEffect, useState } from "react"
import axios from 'axios'
import { BASE_URL, ENDPOINTS, API_KEY } from '../utils/constants'
import FavoriteButton from "./FavoriteButton"
import Spinner from "./Spinner"
import { useDispatch, useSelector } from "react-redux"
import { setNotification } from "../redux/notification/notificationSlice"


const CurrentWeatherCard = ({ city, onClick }) => {
    const dispatch = useDispatch()
    const classes = useStyles()

    const isMetric = useSelector(state => state.userSettings.isMetric)

    const [weather, setWeather] = useState()
    const [error, setError] = useState(false)

    useEffect(() => {
        axios.get(`${BASE_URL}/${ENDPOINTS.CURRENT_FORECAST}/${city.code}`, {
            params: { apikey: API_KEY }
        })
            .then(res => {
                if (res.status === 200) {
                    setWeather(res.data[0])
                } else {
                    dispatch(setNotification({ error: true, message: 'Error loading forecast' }))
                    setError(true)
                }
            })
            .catch(() => {
                dispatch(setNotification({ error: true, message: 'Error loading forecast' }))
                setError(true)
            })
    }, [city])

    if (error) {
        return null
    }

    if (!weather) {
        return (
            <Spinner />
        )
    }

    const { WeatherIcon: weatherIcon, WeatherText: weatherText } = weather
    const IconComponent = iconMap[weatherIcon]

    const temperature = isMetric ? weather.Temperature.Metric : weather.Temperature.Imperial

    return (
        <Grid container justifyContent='center'  >
            <Grid item xs={11}>
                <Paper className={classes.weatherCardContainer}>
                    <Grid container justifyContent='space-between' >
                        <Grid item>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <IconComponent className={classes.weatherIcon} />
                                </Grid>
                                <Grid item>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} onClick={onClick}>
                                            <Typography component='h1' variant='h4' >{city.name}</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography>{temperature.Value} {temperature.Unit}</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography>{weatherText}</Typography>
                                        </Grid>
                                    </Grid>

                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item>
                            <FavoriteButton city={city} />
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>

        </Grid>
    )
}

export default CurrentWeatherCard
