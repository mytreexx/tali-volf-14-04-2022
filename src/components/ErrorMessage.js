import { Grid, Typography } from "@mui/material"
import { useStyles } from "../styles.js/global"
import { ReactComponent as CloudRain } from '../assets/cloud-rain.svg'


const ErrorMessage = ({ children }) => {
    const classes = useStyles()

    return (
        <Grid container alignItems='center' justifyContent='center' spacing={3}>
            <Grid item>
                <Typography variant='h4'>{children}</Typography>
            </Grid>
            <Grid item>
                <CloudRain className={classes.IconSmall} />
            </Grid>
        </Grid>
    )
}

export default ErrorMessage
