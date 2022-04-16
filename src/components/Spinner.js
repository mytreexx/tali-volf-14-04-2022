import { ReactComponent as Sun } from '../assets/sun.svg'
import { useStyles } from '../styles.js/global'


const Spinner = () => {
    const classes = useStyles()

    return (
        <Sun className={classes.spinner} />
    )
}

export default Spinner
