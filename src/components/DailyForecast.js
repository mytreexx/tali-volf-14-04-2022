import { Grid, Typography } from "@mui/material"
import DailyCard from "./DailyCard"


const FutureForecast = ({ dailyWeather }) => {
    const { DailyForecasts: dailyForcasts, Headline: headline } = dailyWeather

    return (
        <Grid container justifyContent='center' spacing={4}>
            <Grid item xs={11}>
                <Grid container justifyContent='space-between'>
                    <Grid item xs={12}>
                        <Typography variant='h4'>Five Day forecast</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant='h6'>{headline?.Text}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            {dailyForcasts?.map((dailyForcast) => {
                return (
                    <Grid item key={dailyForcast.EpochDate}>
                        <DailyCard forecast={dailyForcast} />
                    </Grid>
                )
            })}
        </Grid>
    )
}

export default FutureForecast
