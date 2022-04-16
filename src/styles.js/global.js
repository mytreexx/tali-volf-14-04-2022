import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme) => ({
    navBarPaper: {
        height: 56,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingInline: 16,
        '& *': {
            textDecoration: 'none',
        },
        '& span': {
            color: theme.palette.text.primary
        }
    },

    weatherIcon: {
        fill: theme.palette.primary.main,
        width: 100,
        height: 100
    },

    weatherCardContainer: {
        padding: 8,

        '& h1:hover': {
            color: theme.palette.text.secondary,
            textDecoration: 'underline',
            cursor: 'pointer'
        }

    },

    dailyCardContainer: {
        width: 210,
        padding: 8
    },

    maxWidth: {
        maxWidth: 1200,
        width: '100%'
    },

    pageContainer: {
        paddingTop: 24
    },

    optionCountry: {
        color: theme.palette.text.secondary,
        fontSize: 12,
        marginLeft: 8
    },

    IconSmall: {
        fill: theme.palette.primary.main,
        width: 50
    },

    errorPageContainer: {
        height: 'calc(100vh - 56px)'
    },

    spinner: {
        width: 50,
        height: 50,
        fill: theme.palette.primary.main,
        animation: `$spinnerAnimation 2000ms normal infinite ${theme.transitions.easing.sharp}`,
    },
    
    '@keyframes spinnerAnimation': {
        'from': {
            transform: 'rotate(0deg)'
        },
        'to': {
            transform: 'rotate(360deg)'
        },
    },
}))