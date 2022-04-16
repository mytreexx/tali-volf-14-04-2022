import { Divider, Fade, Grid, Paper, Popper, Switch, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { setSettings } from "../redux/userSettings/userSettingsSlice"


const SettingsMenu = ({ open, anchorEl, placement }) => {
    const dispatch = useDispatch()

    const userTheme = useSelector(state => state.userSettings.theme)
    const isMetric = useSelector(state => state.userSettings.isMetric)

    const isLightTheme = userTheme === 'light'

    const toggleUserTheme = () => {
        const newTheme = isLightTheme ? 'dark' : 'light'
        dispatch(setSettings({ property: 'theme', value: newTheme }))
    }

    const toggleUnits = () => {
        dispatch(setSettings({ property: 'isMetric', value: !isMetric }))
    }

    return (
        <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
            {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                    <Paper elevation={4}>
                        <Grid container justifyContent='center'>
                            <Grid item xs={10}>
                                <Grid container justifyContent='space-between' alignItems='center'>
                                    <Typography>Theme</Typography>
                                    <Grid item xs={7}>
                                        <Grid container alignItems='center' justifyContent='center'>
                                            <Typography>Dark</Typography>
                                            <Switch checked={isLightTheme} onChange={toggleUserTheme} />
                                            <Typography>Light</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Divider />
                            <Grid item xs={10}>
                                <Grid container justifyContent='space-between' alignItems='center'>
                                    <Typography>Unit</Typography>
                                    <Grid item xs={7}>
                                        <Grid container alignItems='center' justifyContent='center'>
                                            <Typography>F</Typography>
                                            <Switch checked={isMetric} onChange={toggleUnits} />
                                            <Typography>C</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Fade>
            )}
        </Popper>
    )
}

export default SettingsMenu