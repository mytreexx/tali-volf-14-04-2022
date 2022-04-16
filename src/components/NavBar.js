import { useState } from 'react'

import { Grid, IconButton, Paper } from '@mui/material'
import FavoriteSharp from '@mui/icons-material/FavoriteSharp'
import SettingsIcon from '@mui/icons-material/Settings'

import { useStyles } from '../styles.js/global'
import Logo from './Logo'
import { Link } from 'react-router-dom'
import SettingsMenu from './SettingsMenu'


const NavBar = () => {
    const classes = useStyles()

    const [anchorEl, setAnchorEl] = useState(null)
    const [open, setOpen] = useState(false)
    const [placement, setPlacement] = useState()

    const handleClick = (newPlacement) => (event) => {
        setAnchorEl(event.currentTarget)
        setOpen((prev) => placement !== newPlacement || !prev)
        setPlacement(newPlacement)
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <Paper square className={classes.navBarPaper}>
                    <Grid container alignItems='center' justifyContent='space-between'>
                        <Grid item>
                            <Link to="/">
                                <Logo />
                            </Link>
                        </Grid>

                        <Grid item>
                            <Grid container alignItems='center' spacing={2}>
                                <Grid item>
                                    <Link to='/favorites'>
                                        <IconButton>
                                            <FavoriteSharp color='primary' />
                                        </IconButton>

                                    </Link>
                                </Grid>

                                <Grid item>
                                    <IconButton onClick={handleClick('bottom-end')}>
                                        <SettingsIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid >

            <SettingsMenu open={open} anchorEl={anchorEl} placement={placement} />
        </Grid >
    )
}

export default NavBar
