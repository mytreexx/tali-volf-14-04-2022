import { Grid } from '@mui/material'
import ErrorMessage from '../components/ErrorMessage'
import { useStyles } from '../styles.js/global'


const NoMatch = () => {
    const classes = useStyles()

    return (
        <Grid container alignItems="center" className={classes.errorPageContainer}>
            <ErrorMessage>404 Not found</ErrorMessage>
        </Grid>
    )
}

export default NoMatch