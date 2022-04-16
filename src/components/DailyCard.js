import { Paper, Grid, Typography } from "@mui/material"
import { useStyles } from "../styles.js/global"
import iconMap from "../utils/iconMap"
import { format, parseISO } from 'date-fns'


const DailyCard = ({ forecast }) => {
    const classes = useStyles()

    const { Day: day, Night: night, Temperature: temperature, Date: date } = forecast

    const DayIcon = forecast && iconMap[day.Icon]
    const NightIcon = forecast && iconMap[night.Icon]

    return (
        <Paper className={classes.dailyCardContainer}>
            <Grid container justifyContent='center' spacing={1}>
                <Grid item xs={12}>
                    <Grid container justifyContent='center'>
                        <Typography variant='h5'>{format(parseISO(date), 'dd/MM')}</Typography>
                    </Grid>
                </Grid>
                
                <Grid item >
                    <Typography>{day.IconPhrase}</Typography>
                </Grid>

                <Grid item xs={12}>
                    <Grid container justifyContent='center'>
                        {DayIcon && <DayIcon className={classes.weatherIcon} />}
                    </Grid>
                </Grid>

                <Grid item >
                    <Typography>{temperature.Maximum.Value}{temperature.Maximum.Unit} - {temperature.Minimum.Value}{temperature.Maximum.Unit}</Typography>
                </Grid>

                <Grid item xs={12}>
                    <Grid container justifyContent='center'>
                        {NightIcon && <NightIcon className={classes.weatherIcon} />}
                    </Grid>
                </Grid>

                <Grid item >
                    <Typography>{night.IconPhrase}</Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default DailyCard
