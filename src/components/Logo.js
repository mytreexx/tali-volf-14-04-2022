import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined'
import { Grid, Typography } from '@mui/material'


const Logo = () => (
    <Grid container alignItems='center' spacing={1}>
        <Grid item>
            <CloudOutlinedIcon color='primary' />
        </Grid>

        <Grid item>
            <Typography variant="h6" component="span">weatherApp</Typography>
        </Grid>
    </Grid>
)

export default Logo
